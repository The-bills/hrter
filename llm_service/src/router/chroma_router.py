import jsonpickle
from flask import Blueprint, request, Response, jsonify
from llama_index.llms.openai import OpenAI
from services.LlamaIndex import LlamaIndex
from services.ChromaStore import ChromaStore
from services.TokenCounter import TokenCounter
from resolvers.position_resolver import chroma_insert


api = Blueprint('chroma_api', __name__)
llm = OpenAI(model="gpt-4-1106-preview", temperature=0.0, max_retries=5)


@api.route("/jobs/<job_doc_id>/resume", methods=['POST'])
def insert_resume(job_doc_id):
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        content = request.json["content"]
        scores = request.json["scores"]
        if not content:
            return 'Invalid body'
        doc = chroma_insert(score_dict=scores,
                            content=content,
                            type="cv",
                            job_doc_id=job_doc_id)
        resume_doc_id = doc.doc_id
        job_offer = ChromaStore().collection.get(where={'doc_id': job_doc_id}, include=['embeddings'])['embeddings'][0]
        res = ChromaStore().query_collection(embeddings=job_offer, where={"doc_id": resume_doc_id})
        tokens = TokenCounter().count_tokens()
        chroma_distance = res['distances'][0][0]
        response_data = {
            "resume_doc_id": resume_doc_id,
            "chroma_distance": chroma_distance,
            "tokens": tokens
        }
        return jsonify(response_data)
        # return jsonpickle.encode({"resume_doc_id": resume_doc_id, "chroma_distance": chroma_distance}, unpicklable=False)
        

@api.route("/jobs", methods=['POST'])
def insert_job():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        content = request.json["content"]
        scores = request.json["scores"]
        if not content:
            return 'Invalid body'
        doc = chroma_insert(type="job_offer",
                            score_dict=scores,
                            content=content)
        tokens = TokenCounter().count_tokens()
        res = doc.doc_id
        response_data = {
            "job_doc_id": res,
            "tokens": tokens
        }
        return jsonify(response_data)
    
@api.route("/jobs/<job_doc_id>/match_precise", methods=['GET'])
def match_precise(job_doc_id):
    position = ChromaStore().collection.get(where={'doc_id': job_doc_id}, include=['documents'])
    job_offer = position['documents'][0]
    res = LlamaIndex().match_precise(job_doc_id, job_offer).response
    tokens = TokenCounter().count_tokens()
    response_data = {
        "matches": jsonpickle.decode(res),
        "tokens": tokens
    }
    return jsonify(response_data)

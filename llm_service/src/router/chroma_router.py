import jsonpickle
from flask import Blueprint, request, Response

from llama_index.llms import OpenAI
from services.LlamaIndex import LlamaIndex
from services.ChromaStore import ChromaStore
from resolvers.position_resolver import chroma_insert


api = Blueprint('chroma_api', __name__)
llm = OpenAI(model="gpt-4-1106-preview", temperature=0.0, max_tokens=4096, max_retries=5)


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
                            type="cv")
        resume_doc_id = doc.doc_id

        job_offer = ChromaStore().collection.get(where={'doc_id': job_doc_id}, include=['embeddings'])['embeddings'][0]
        res = ChromaStore().query_collection(embeddings=job_offer, where={"doc_id": resume_doc_id})
        chroma_distance = res['distances'][0][0]
        return jsonpickle.encode({"resume_doc_id": resume_doc_id, "chroma_distance": chroma_distance}, unpicklable=False)
        

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
        res = doc.doc_id
        return jsonpickle.encode({"job_doc_id": res}, unpicklable=False)
    
@api.route("/jobs/<job_doc_id>/match_precise", methods=['GET'])
def match_precise(job_doc_id):
    position = ChromaStore().collection.get(where={'doc_id': job_doc_id}, include=['documents'])
    job_offer = position['documents'][0]
    res = LlamaIndex().match_precise(job_offer).response
    return Response(res, mimetype='application/json')

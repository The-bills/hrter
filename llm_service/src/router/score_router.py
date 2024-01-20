import jsonpickle
from flask import Blueprint, request
import utils.prompts as prompts
from llama_index.llms import OpenAI

api = Blueprint('cv_api', __name__)
llm = OpenAI(model="gpt-4-1106-preview", temperature=0.0, max_tokens=4096, max_retries=5)

@api.route("/resume", methods=['POST'])
def summarize_resume():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
        return 'Content-Type not supported'
    json = request.json
    if(json['content'] is None):
        return 'Invalid body'
    prompt = prompts.score_cv_prompt(json['content'])
    res = llm.complete(prompt).text
    return jsonpickle.encode(res, unpicklable=False)

@api.route("/job", methods=['POST'])
def summarize_job():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
        return 'Content-Type not supported'
    json = request.json
    if(json["content"] is None):
        return 'Invalid body'
    prompt = prompts.score_position_prompt(json["content"])
    res = llm.complete(prompt).text
    # return jsonpickle.encode(res, unpicklable=False)
    # set response type to json
    return res

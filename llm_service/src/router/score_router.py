from flask import Blueprint, request, Response
import utils.prompts as prompts
from services.TokenCounter import TokenCounter
from utils.helpers import set_proper_score_format
from llama_index.llms.openai import OpenAI 

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
    TokenCounter().count_tokens(prompt)
    llm_res = llm.complete(prompt).text
    res = set_proper_score_format(llm_res)
    return Response(res, mimetype='application/json')

@api.route("/job", methods=['POST'])
def summarize_job():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
        return 'Content-Type not supported'
    json = request.json
    if(json["content"] is None):
        return 'Invalid body'
    prompt = prompts.score_position_prompt(json["content"])
    TokenCounter().count_tokens(prompt)
    llm_res = llm.complete(prompt).text
    res = set_proper_score_format(llm_res)
    return Response(res, mimetype='application/json')

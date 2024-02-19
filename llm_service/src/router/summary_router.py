import jsonpickle
from flask import Blueprint, request
from llama_index.legacy.llms.openai import OpenAI
import utils.prompts as prompts
from services.TokenCounter import TokenCounter

api = Blueprint('summary_api', __name__)
llm = OpenAI(model="gpt-4-1106-preview", temperature=0.0, max_tokens=4096, max_retries=5)

@api.route("/resume", methods=['POST'])
def summarize_resume():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
        return 'Content-Type not supported'
    json = request.json
    if(json['content'] is None):
        return 'Invalid body'
    prompt = prompts.summarize_cv_prompt(json['content'])
    TokenCounter().count_tokens(prompt)
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
    prompt = prompts.summarize_position_prompt(json["content"])
    TokenCounter().count_tokens(prompt)
    res = llm.complete(prompt).text
    return jsonpickle.encode(res, unpicklable=False)

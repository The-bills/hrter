from services.TokenCounter import TokenCounter
from flask import Blueprint, jsonify

api = Blueprint('token_api', __name__)


@api.route('/', methods=['GET'])
def get_tokens():
    prompt_tokens = TokenCounter().count_tokens_all()
    return jsonify(prompt_tokens)
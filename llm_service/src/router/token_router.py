import tiktoken
from services.TokenCounter import TokenCounter
from services.LlamaIndex import LlamaIndex
import jsonpickle
from flask import Blueprint, request, Response
import utils.prompts as prompts
import utils.helpers as helpers

api = Blueprint('token_api', __name__)


@api.route('/', methods=['GET'])
def get_tokens():
    prompt_tokens = TokenCounter().count_tokens_all()
    llama_prompt_tokens = LlamaIndex().count_prompt_tokens_used()
    llama_embeding_tokens = LlamaIndex().count_embed_tokens_used()
    return jsonpickle.encode({
        "tokens_used": prompt_tokens,
        "llama_embeding_tokens": llama_embeding_tokens,
        "llama_prompt_tokens": llama_prompt_tokens
        }, unpicklable=False)

import tiktoken
from llama_index.core.callbacks import TokenCountingHandler
from services.LlamaIndex import *

class TokenCounter:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.prompt_tokens = 0
            cls.embedding_tokens = 0
            cls.completion_tokens = 0
            cls.token_handler_prompt = tiktoken.encoding_for_model("gpt-4-1106-preview")
            cls.token_handler_llama = LlamaIndex().token_counter
        return cls._instance

    def count_tokens(self, prompt=None):
        if prompt is not None:
            prompt_tokens_num = len(self.token_handler_prompt.encode(prompt)) 
        else: 
            prompt_tokens_num = self.token_handler_llama.prompt_llm_token_count
        embedding_tokens_num = self.token_handler_llama.total_embedding_token_count
        completion_tokens_num = self.token_handler_llama.completion_llm_token_count
        self.prompt_tokens += prompt_tokens_num
        self.embedding_tokens += embedding_tokens_num
        self.completion_tokens += completion_tokens_num
        return {
            "prompt_tokens": prompt_tokens_num,
            "embedding_tokens": embedding_tokens_num,
            "completion_tokens": completion_tokens_num
            }

    def count_tokens_all(self):
        return {
            "prompt_tokens": self.prompt_tokens, 
            "embedding_tokens": self.embedding_tokens,
            "completion_tokens": self.completion_tokens
            }


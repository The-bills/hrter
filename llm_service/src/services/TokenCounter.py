import tiktoken

class TokenCounter:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.tokens = 0
            cls.token_handler = tiktoken.encoding_for_model("gpt-4-1106-preview")
        return cls._instance

    def count_tokens(self, prompt):
        num_tokens = self.token_handler.encode(prompt)
        self.tokens += len(num_tokens)
        return len(num_tokens)

    def count_tokens_all(self):
        return self.tokens

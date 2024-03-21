import requests
import json
from services.Validators_llm import *
from services.Validator_main import *

class RequestSender:
    validator_map_llm = {
            "score_resume": ScoreValidatorResume,
            "score_job": ScoreValidatorJob,
            "summary": SummaryValidator,
            "chroma_insert_job": ChromaInsertJobValidator,
            "chroma_insert_resume": ChromaInsertResumeValidator,
            "match": MatchValidator,
            "token": TokenValidator
        }
    
    validator_map_main = {
        "api_status": ApiValidatorStatus
    }

    def __init__(self, method: str, url: str, payload: dict, headers: dict):
        self.method = method
        self.url = url
        self.payload = json.dumps(payload)
        self.headers = headers
    
    def send_llm(self, type):
        response = requests.request(self.method, self.url, headers=self.headers, data=self.payload)
        validator = self.validator_map_llm[type](response)
        validator.validate(response)
        return response
    
    def send_main(self, type):
        response = requests.request(self.method, self.url, headers=self.headers, data=self.payload)
        validator = self.validator_map_main[type](response)
        validator.validate()
        return response
        

import requests
import json

class BaseValidatorLlm:

    def __init__(self, response):
        self.request = response

    def validate(self, response, expected_keys = [], key_chekker = False): 
        assert response.status_code == 200
        assert response.json() is not None
        response_data = json.loads(response.text)
        for key in expected_keys:
            assert key in response_data, f"Key {key} not found in response"        
        if key_chekker == True:
            for key in expected_keys:
                assert response_data[key] is not None and response_data[key] > 0, f"Key {key} has no value or value is 0"


class ScoreValidatorResume(BaseValidatorLlm):

    def validate(self, response):
        expected_keys = [
            "Java", "Git", "Kafka", "Android", "HTML", "Maven", "Hibernate",
            "WildFly", "SonarQube", "Scrum", "JPA", "Linux", "Oracle SQL",
            "REST API", "C++", "Java EE", "Jackson", "Swagger", "JUnit",
            "Jenkins", "Jira", "Postman", "CI/CD", "JSON"
        ]
        super().validate(response, expected_keys, key_chekker=True)


class ScoreValidatorJob(BaseValidatorLlm):
    
    def validate(self, response):
        expected_keys = [
            "Programming (Java, JavaScript, Python, C#)", 
            "Relational Databases (Oracle, PostgreSQL)", "Jira", "Scrum"
        ]
        super().validate(response, expected_keys, key_chekker=True)


class SummaryValidator(BaseValidatorLlm):

    def validate(self, response):
        super().validate(response)
        assert response.text == 'live'

class ChromaInsertJobValidator(BaseValidatorLlm):

    def validate(self, response):
        expected_keys = ["job_doc_id"]
        super().validate(response, expected_keys)


class ChromaInsertResumeValidator(BaseValidatorLlm):

    def validate(self, response):
        expected_keys = ["resume_doc_id", "chroma_distance"]
        super().validate(response, expected_keys)


class MatchValidator(BaseValidatorLlm):

    def validate(self, response):
        expected_keys = ["name", "reason", "doc_id"]
        super().validate(response, expected_keys)


class TokenValidator(BaseValidatorLlm):

    def validate(self, response):
        expected_keys = [
            "tokens_used", "llama_embeding_tokens", "llama_prompt_tokens"
        ]
        super().validate(response, expected_keys, key_chekker=True)

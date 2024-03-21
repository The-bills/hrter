import json


class BaseValidatorMain:
    def __init__(self, response):
        self.response = response

    def validate(self, expected_keys = None):
        assert self.response.status_code == 200
        assert self.response.text is not None
        if expected_keys is not None and type(response_data) == dict:
            response_data = json.loads(self.response.text)
            for key in expected_keys:
                assert key in response_data, f"Key {key} not found in response"


class ApiValidatorStatus(BaseValidatorMain):
    def __init__(self, response):
        super().__init__(response)
        
    def validate(self):
        super().validate()



class OrganisationsValidator(BaseValidatorMain):
    def __init__(self, response):
        super().__init__(response)
    
    def validate(self):
        super().validate()
        


class JobsValidator(BaseValidatorMain):
    pass


class ResumesValidator(BaseValidatorMain):
    pass

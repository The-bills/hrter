import pytest
import requests
import json
from utils.urls import *
from utils.bodies import *
from utils.headers import *

@pytest.fixture
def get_job_summarize():
    url = SUMMARY_JOB_URL
    payload = json.dumps(job_body_dict)
    headers = application_json_headers
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

@pytest.fixture
def get_resume_summarize():
    url = SUMMARY_RESUME_URL
    payload = json.dumps(resume_body_dict)
    headers = application_json_headers
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

@pytest.fixture
def get_job_score():
    url = SCORE_JOB_URL
    payload = json.dumps(job_body_dict)
    headers = application_json_headers
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

@pytest.fixture
def get_resume_score():
    url = SCORE_RESUME_URL
    payload = json.dumps(resume_body_dict)
    headers = application_json_headers
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

from services.Validators_llm import *
from services.RequestSender import RequestSender
from llm.utils.bodies import *
from llm.utils.urls import *
from llm.utils.headers import *
from conftest import *


def test_llm_service_summarize_job():
    request_job = RequestSender('POST', SUMMARY_JOB_URL, payload=job_body_dict, headers=application_json_headers)
    response_job = request_job.send_llm('summary')

def test_llm_service_summarize_resume():
    request_resume = RequestSender('POST', SUMMARY_RESUME_URL, payload=resume_body_dict, headers=application_json_headers)
    response_resume = request_resume.send_llm('summary')

def test_llm_service_score_resume():
    request_resume = RequestSender('POST', SCORE_RESUME_URL, payload=resume_body_dict, headers=application_json_headers)
    response_resume = request_resume.send_llm('score_resume')

def test_llm_service_score_job():
    request_job = RequestSender('POST', SCORE_JOB_URL, payload=job_body_dict, headers=application_json_headers)
    response_job = request_job.send_llm('score_job')

def test_llm_service_chroma_insert_job(get_job_summarize: str, get_job_score: str):
    body_payload = {
        "content": get_job_summarize,
        "scores": get_job_score
    }
    request_job = RequestSender('POST', CHROMA_INSERT_JOB_URL, payload=body_payload, headers=application_json_headers)
    response = request_job.send_llm('chroma_insert_job')
    response_data = json.loads(response.text)
    job_doc_id = response_data['job_doc_id']

    url = setup_chroma_insert_resume_url(job_doc_id)
    request_resume = RequestSender('POST', url=url, payload=body_payload, headers=application_json_headers)
    response = request_resume.send_llm('chroma_insert_resume')

    url = setup_chroma_match_precise_url(job_doc_id)
    request = RequestSender('GET', url, payload={}, headers=application_json_headers)
    response = request.send_llm('match')

def test_llm_service_token_counte():
    request_job = RequestSender('GET', TOKEN_COUNT_URL, payload={}, headers={})
    response_job = request_job.send_llm('token')

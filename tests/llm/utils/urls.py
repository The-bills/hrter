URL_PREFIX = 'http://server.hrter.malatynski.dev:8001'

CHROMA_INSERT_JOB_URL = f'{URL_PREFIX}/chroma/jobs'

SCORE_RESUME_URL = f'{URL_PREFIX}/score/resume'
SCORE_JOB_URL = f'{URL_PREFIX}/score/job'

SUMMARY_RESUME_URL = f'{URL_PREFIX}/summarize/resume'
SUMMARY_JOB_URL = f'{URL_PREFIX}/summarize/job'

TOKEN_COUNT_URL = f'{URL_PREFIX}/tokens'

def setup_chroma_insert_resume_url(job_doc_id):
    CHROMA_INSERT_RESUME_URL = f'{URL_PREFIX}/chroma/jobs/{job_doc_id}/resume'
    return CHROMA_INSERT_RESUME_URL

def setup_chroma_match_precise_url(job_doc_id):
    CHROMA_MATCH_PRECISE_URL = f'{URL_PREFIX}/chroma/jobs/{job_doc_id}/match_precise'
    return CHROMA_MATCH_PRECISE_URL

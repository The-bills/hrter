from services.Validator_main import *
from services.RequestSender import RequestSender
from conftest import *


def test_main_service_api_status():
    request = RequestSender('GET', "http://server.hrter.malatynski.dev:8000/api/status", payload={}, headers={})
    responose = request.send_main('api_status')


def test_main_service_organisations_get():
    pass

def test_main_service():
    pass

def test_main_service():
    pass

def test_main_service():
    pass
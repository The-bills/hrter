import jsonpickle
from flask import Blueprint, request

api = Blueprint('cv_api', __name__)

@api.route("/resume")
def score_cv():
    res = {}
    return jsonpickle.encode(res, unpicklable=False)

@api.route("/job")
def score_position(id):
    res = {}
    return jsonpickle.encode(res, unpicklable=False)

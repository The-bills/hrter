from flask import Flask
from router import score_router, summary_router, chroma_router, token_router

app = Flask("app")
app.config['UPLOAD_FOLDER'] = 'uploads'

from flask_cors import CORS, cross_origin
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(summary_router.api, url_prefix='/summarize')
app.register_blueprint(score_router.api, url_prefix='/score')
app.register_blueprint(chroma_router.api, url_prefix='/chroma')
app.register_blueprint(token_router.api, url_prefix='/tokens')

from llama_index.schema import Document
from services.LlamaIndex import LlamaIndex
from datetime import datetime

def chroma_insert(score_dict, content, type, job_doc_id=None) -> Document:
    document = Document()
    document.set_content(f"{content}")
    score = str(score_dict).replace("{","").replace("}","")
    if type == "cv":
        document.metadata = {"type": f"{type}",
                            "score": score,
                            "job_doc_id": job_doc_id,
                            "inserted_at": datetime.now().isoformat()
                            }
    else:
        document.metadata = {"type": f"{type}",
                            "score": score,
                            "inserted_at": datetime.now().isoformat()
                            }
    LlamaIndex().insert(document)
    return document

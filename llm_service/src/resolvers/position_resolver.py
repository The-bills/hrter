from llama_index.schema import Document
from services.LlamaIndex import LlamaIndex
from datetime import datetime

def chroma_insert(score_dict, content, type) -> Document:
    document = Document()
    document.set_content(f"{content}")
    score = str(score_dict).replace("{","").replace("}","")
    document.metadata = {"type": f"{type}",
                         "score": score,
                        "inserted_at": datetime.now().isoformat()}
    LlamaIndex().insert(document)
    return document
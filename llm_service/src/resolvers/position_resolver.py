from llama_index.schema import Document
from services.LlamaIndex import LlamaIndex
from datetime import datetime

def chroma_insert(score, content, type) -> Document:
    document = Document()
    document.set_content(f"{content}")
    document.metadata = {"type": f"{type}",
                         "score": score,
                        "inserted_at": datetime.now().isoformat()}
    LlamaIndex().insert(document)
    return document
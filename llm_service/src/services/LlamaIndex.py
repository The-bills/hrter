from llama_index import VectorStoreIndex, ServiceContext
from llama_index.vector_stores import ChromaVectorStore
from llama_index.storage.storage_context import StorageContext
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.embeddings import LangchainEmbedding
from llama_index.schema import Document
from utils.prompts import *
from utils.prompts import get_position_summarize_query
from services.ChromaStore import ChromaStore
from dotenv import load_dotenv, find_dotenv
from llama_index.retrievers import VectorIndexRetriever
load_dotenv(find_dotenv())

    
class LlamaIndex:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            
            # Chroma
            cls.chroma = ChromaStore()
            cls.vector_store = ChromaVectorStore(chroma_collection=cls.chroma.collection)
            cls.storage_context = StorageContext.from_defaults(vector_store=cls.vector_store)

            # Embedding
            cls.embed_model = LangchainEmbedding(
                HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2"),
            )
            
            #ServiceContext/VectorStore
            cls.service_context = ServiceContext.from_defaults(
                embed_model=cls.embed_model)
            cls.index = VectorStoreIndex.from_vector_store(vector_store=cls.vector_store,
                                                            service_context=cls.service_context)
        return cls._instance
    
    def insert(self, document: Document):
        self.index.insert(document)

    def get_all(self):
        list = self.chroma.collection.get()

    def match_precise(self, position: str):
        retriever = VectorIndexRetriever(
            index=self.index,
            similarity_top_k=20
        )
        query_engine = RetrieverQueryEngine(
            retriever=retriever,
        )
        query = get_position_summarize_query(position)
        res = query_engine.query(query)
        return res

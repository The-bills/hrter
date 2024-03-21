from llama_index.core import VectorStoreIndex, ServiceContext
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core.storage.storage_context import StorageContext
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.legacy.embeddings import LangchainEmbedding
from llama_index.core.schema import Document
from utils.prompts import *
from llama_index.core.vector_stores.types import MetadataFilters, ExactMatchFilter
from utils.prompts import get_position_summarize_query
from services.ChromaStore import ChromaStore
import tiktoken
import jsonpickle
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.callbacks import CallbackManager, TokenCountingHandler
from dotenv import load_dotenv, find_dotenv
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
                HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
            )

            # TokenCounter
            cls.token_counter = TokenCountingHandler(
            tokenizer=tiktoken.encoding_for_model(
                "gpt-4-1106-preview").encode
            )
            cls.callback_manager = CallbackManager([cls.token_counter])
            
            #ServiceContext/VectorStore
            cls.service_context = ServiceContext.from_defaults(
                embed_model=cls.embed_model,
                callback_manager=cls.callback_manager)
            cls.index = VectorStoreIndex.from_vector_store(
                vector_store=cls.vector_store,
                service_context=cls.service_context)
        return cls._instance
    
    def insert(self, document: Document):
        self.index.insert(document)

    def get_all(self):
        list = self.chroma.collection.get()

    def _query(self, job_doc_id, query):
        filter_exact_match = [ExactMatchFilter(key="job_doc_id", value=job_doc_id)]
        filters = MetadataFilters(filters=filter_exact_match)
        retriever = VectorIndexRetriever(
            index=self.index,
            similarity_top_k=10,
            filters=filters
        )
        query_engine = RetrieverQueryEngine(
            retriever=retriever
        )
        res = query_engine.query(query)
        return res

    def match_precise(self, job_doc_id, position: str):
        query = get_position_summarize_query(position)
        res = self._query(job_doc_id, query)
        return res

    def count_embed_tokens_used(self):
        all_tokens = self.token_counter.total_embedding_token_count
        return all_tokens
    
    def count_prompt_tokens_used(self):
        all_tokens = self.token_counter.total_llm_token_count
        return all_tokens
    
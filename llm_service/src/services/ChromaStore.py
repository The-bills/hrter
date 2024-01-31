from chromadb import PersistentClient


class ChromaStore:
    _instance = None

    def __new__(cls, collection_name:str = 'default5',path="FOLDER_PATH_CHROMA_DB"):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

            cls.client = PersistentClient(path=path)
            cls.collection = cls.client.get_or_create_collection(collection_name)
        return cls._instance
    
    def query_collection(self, embeddings, where):
        return self.collection.query(
            query_embeddings=embeddings,
            # query_texts="",
            n_results=10,
            include=["metadatas", "distances"],
            where=where
        )
    
    
import chromadb


client = chromadb.PersistentClient(
    path="chroma_db"
)


collection = client.get_or_create_collection(
    name="documents",
    metadata={
        "hnsw:space": "cosine"
    }
)



class VectorService:


    @staticmethod
    def search(
        query_embedding,
        k=5,
        document_id=None
    ):


        kwargs = {

            "query_embeddings": [
                query_embedding
            ],

            "n_results": k,

            "include": [
                "documents",
                "metadatas",
                "distances"
            ]

        }


        if document_id:

            kwargs["where"] = {

                "document_id": document_id

            }


        return collection.query(**kwargs)



    @staticmethod
    def add_document(
        document_id,
        filename,
        chunks,
        embeddings
    ):


        ids = []

        documents = []

        metadatas = []



        for i, chunk in enumerate(chunks):


            ids.append(
                f"{document_id}_{i}"
            )


            documents.append(
                chunk["text"]
            )


            metadatas.append({

                "document_id": document_id,

                "filename": filename,

                "page": chunk["page"],

                "chunk_index": i

            })



        collection.add(

            ids=ids,

            documents=documents,

            embeddings=embeddings,

            metadatas=metadatas

        )
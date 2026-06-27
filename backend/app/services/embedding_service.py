import google.generativeai as genai

from app.core.config import GEMINI_API_KEY


genai.configure(
    api_key=GEMINI_API_KEY
)


class EmbeddingService:


    def embed(self, texts):

        embeddings = []


        for text in texts:

            result = genai.embed_content(

                model="models/embedding-001",

                content=text,

                task_type="retrieval_document"

            )


            embeddings.append(
                result["embedding"]
            )


        return embeddings



embedding_service = EmbeddingService()
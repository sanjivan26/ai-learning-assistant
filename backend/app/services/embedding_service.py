from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY

client = genai.Client(
api_key=GEMINI_API_KEY
)

class EmbeddingService:


    def embed(
        self,
        texts,
        task_type="RETRIEVAL_DOCUMENT"
    ):

        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=texts,
            config=types.EmbedContentConfig(
                task_type=task_type
            )
        )

        return [
            embedding.values
            for embedding in response.embeddings
        ]


embedding_service = EmbeddingService()

from fastapi import APIRouter, Query

from app.services.embedding_service import embedding_service
from app.services.vector_service import VectorService

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def semantic_search(
    query: str = Query(...),
    limit: int = Query(5, ge=1, le=10)
):

    embedding = embedding_service.embed([query])[0]

    results = VectorService.search(
        embedding,
        k=limit
    )

    documents = results["documents"][0]
    metadata = results["metadatas"][0]
    distances = results["distances"][0]

    response = []

    for doc, meta, distance in zip(
        documents,
        metadata,
        distances
    ):

        similarity = round(1 - distance, 4)

        response.append({
            "filename": meta["filename"],
            "document_id": meta["document_id"],
            "page": meta["page"],
            "chunk_index": meta["chunk_index"],
            "similarity": similarity,
            "text": doc
        })

    return {
        "query": query,
        "count": len(response),
        "results": response
    }
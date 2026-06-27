from fastapi import APIRouter
import uuid

from app.schemas.chat import ChatRequest
from app.services.embedding_service import embedding_service
from app.services.vector_service import VectorService
from app.services.gemini_service import GeminiService
from app.services.memory_service import memory_service


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)



@router.post("/")
def chat(request: ChatRequest):


    session_id = request.session_id


    if session_id is None:

        session_id = str(uuid.uuid4())



    history = memory_service.get_history(
        session_id
    )



    query_embedding = embedding_service.embed(
        [request.question],
        task_type="RETRIEVAL_QUERY"
    )[0]



    results = VectorService.search(
        query_embedding,
        k=5
    )



    documents = results["documents"][0]

    metadata = results["metadatas"][0]

    distances = results["distances"][0]



    print("DISTANCES:", distances)



    context = ""

    sources = []



    conversation = ""


    for message in history:

        conversation += (

            f"{message['role']}: "
            f"{message['message']}\n"

        )



    SIMILARITY_THRESHOLD = 0.35



    for doc, meta, distance in zip(

        documents,

        metadata,

        distances

    ):


        # Convert distance to similarity score

        similarity = 1 / (1 + distance)



        print(

            "FILE:",

            meta["filename"],

            "PAGE:",

            meta["page"],

            "SIMILARITY:",

            similarity

        )



        if similarity < SIMILARITY_THRESHOLD:

            continue



        context += (

            f"Document: {meta['filename']}\n"

            f"Page: {meta['page']}\n\n"

            f"{doc}\n\n"

            "----------------------------------------\n\n"

        )



        sources.append({

            "filename": meta["filename"],

            "page": meta["page"],

            "similarity": round(similarity, 3)

        })



    if not context.strip():

        return {

            "answer":
            "I couldn't find any relevant information in the uploaded documents.",

            "sources": []

        }

    print("=" * 80)
    print("CONTEXT SENT TO GEMINI")
    print("=" * 80)
    print(context)
    print("=" * 80)


    answer = GeminiService.answer(

        question=request.question,

        context=context,

        history=conversation

    )



    memory_service.add_message(

        session_id,

        "User",

        request.question

    )



    memory_service.add_message(

        session_id,

        "Assistant",

        answer

    )



    return {

        "session_id": session_id,

        "answer": answer,

        "sources": sources

    }
import os

from fastapi import APIRouter
import shutil

from app.services.vector_service import collection

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads"


@router.get("/")
def list_documents():

    documents = []

    if not os.path.exists(UPLOAD_DIR):
        return []

    for document_id in os.listdir(UPLOAD_DIR):

        folder = os.path.join(
            UPLOAD_DIR,
            document_id
        )

        if not os.path.isdir(folder):
            continue

        files = os.listdir(folder)

        if not files:
            continue

        documents.append({
            "document_id": document_id,
            "filename": files[0]
        })

    @router.delete("/{document_id}")
    def delete_document(document_id: str):

        folder = os.path.join(
            UPLOAD_DIR,
            document_id
        )

        if not os.path.exists(folder):

            return {
                "status": "Document not found"
            }

        collection.delete(
            where={
                "document_id": document_id
            }
        )

        shutil.rmtree(folder)

        return {
            "status": "deleted"
        }

    return documents
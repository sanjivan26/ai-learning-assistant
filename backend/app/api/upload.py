import os
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.schemas.document import UploadResponse
from app.services.pdf_service import PDFService
from app.services.chunk_service import ChunkService
from app.services.embedding_service import embedding_service
from app.services.vector_service import VectorService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post(
    "/",
    response_model=UploadResponse
)
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Generate a unique ID for this document
        document_id = str(uuid.uuid4())

        # Create a folder for this document
        document_folder = os.path.join(UPLOAD_DIR, document_id)
        os.makedirs(document_folder, exist_ok=True)

        # Save the uploaded PDF
        file_path = os.path.join(document_folder, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text page-by-page
        pages = PDFService.extract_pages(file_path)

        # Split into chunks
        chunks = ChunkService.chunk_pages(pages)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="No readable text found in the uploaded PDF."
            )

        # Generate embeddings
        texts = [chunk["text"] for chunk in chunks]

        embeddings = embedding_service.embed(texts)

        # Store vectors in ChromaDB
        VectorService.add_document(
            document_id=document_id,
            filename=file.filename,
            chunks=chunks,
            embeddings=embeddings
        )

        return UploadResponse(
            status="success",
            document_id=document_id,
            filename=file.filename,
            pages=len(pages),
            chunks=len(chunks)
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )
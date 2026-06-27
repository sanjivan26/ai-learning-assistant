from pydantic import BaseModel


class UploadResponse(BaseModel):
    status: str
    document_id: str
    filename: str
    pages: int
    chunks: int
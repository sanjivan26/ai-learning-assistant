import api from "./api";

export async function getDocuments() {
    const res = await api.get("/documents/");
    return res.data;
}

export async function deleteDocument(documentId: string) {
    const res = await api.delete(`/documents/${documentId}`);
    return res.data;
}

export async function uploadDocument(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const res = await api.post(
        "/upload/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
}
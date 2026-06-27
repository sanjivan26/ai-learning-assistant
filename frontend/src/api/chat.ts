import api from "./api";


export interface Source {

    filename: string;

    page: number;

    similarity: number;

}


export interface ChatResponse {

    session_id: string;

    answer: string;

    sources: Source[];

}



export async function askQuestion(

    question: string,

    session_id?: string

): Promise<ChatResponse> {


    const response = await api.post(

        "/chat/",

        {
            question,

            session_id
        }

    );


    return response.data;

}
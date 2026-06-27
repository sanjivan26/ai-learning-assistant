import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
    askQuestion,
    type Source,
    type ChatResponse
} from "../../api/chat";

import ChatInput from "./ChatInput";
import Message from "./Message";
import Sources from "./Sources";


interface ChatMessage {

    role: "user" | "assistant";

    text: string;

}



export default function ChatWindow() {


    const [messages, setMessages] = useState<ChatMessage[]>([]);


    const [sources, setSources] = useState<Source[]>([]);


    const [sessionId, setSessionId] = useState<string | undefined>(
        undefined
    );



    const mutation = useMutation<
        ChatResponse,
        Error,
        string
    >({


        mutationFn: (question: string) =>

            askQuestion(
                question,
                sessionId
            ),



        onSuccess: (data) => {


            setSessionId(
                data.session_id
            );



            setMessages((prev) => [

                ...prev,

                {
                    role: "assistant",
                    text: data.answer
                }

            ]);



            setSources(
                data.sources
            );


        },



        onError: () => {


            setMessages((prev) => [

                ...prev,

                {
                    role: "assistant",
                    text: "Something went wrong while answering."
                }

            ]);


        }


    });



    function sendMessage(question: string) {


        setMessages((prev) => [

            ...prev,

            {
                role: "user",
                text: question
            }

        ]);



        mutation.mutate(question);


    }





    return (

        <div className="flex h-full flex-col">


            {/* Messages */}

            <div className="flex-1 overflow-y-auto space-y-4 p-6">


                {messages.length === 0 && (

                    <div className="flex h-full items-center justify-center">


                        <div className="text-center">


                            <h1 className="text-4xl font-bold text-white">

                                ScholarAI

                            </h1>


                            <p className="mt-3 text-zinc-400">

                                Upload a PDF and ask questions about it

                            </p>


                        </div>


                    </div>

                )}




                {messages.map((message, index) => (

                    <Message

                        key={index}

                        role={message.role}

                        text={message.text}

                    />

                ))}




                {mutation.isPending && (

                    <Message

                        role="assistant"

                        text="Thinking..."

                    />

                )}


            </div>





            {/* Input + Sources */}

            <div className="border-t border-zinc-800 p-6">


                <ChatInput

                    onSend={sendMessage}

                />



                <Sources

                    sources={sources}

                />


            </div>



        </div>

    );

}
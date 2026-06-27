import { useState } from "react";

interface Props {

    onSend(
        question: string
    ): void;

}

export default function ChatInput({

    onSend,

}: Props) {

    const [text, setText] = useState("");

    function send() {

        if (!text.trim())
            return;

        onSend(text);

        setText("");

    }

    return (

        <div className="flex gap-3">

            <input

                className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none"

                value={text}

                onChange={(e) =>
                    setText(e.target.value)
                }

                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        send();
                }}

                placeholder="Ask your documents..."

            />

            <button

                onClick={send}

                className="rounded-lg bg-purple-600 px-6"

            >

                Send

            </button>

        </div>

    );

}
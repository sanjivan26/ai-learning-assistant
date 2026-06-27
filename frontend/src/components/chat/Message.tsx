interface Props {

    role: "user" | "assistant";

    text: string;

}

export default function Message({

    role,

    text,

}: Props) {

    const user = role === "user";

    return (

        <div
            className={`flex ${
                user
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-2xl rounded-xl p-4 ${
                    user
                        ? "bg-purple-600"
                        : "bg-zinc-800"
                }`}
            >

                {text}

            </div>

        </div>

    );

}
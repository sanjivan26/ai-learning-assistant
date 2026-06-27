import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";


interface Props {
    role: "user" | "assistant";
    text: string;
}


type CustomComponents = Components & {
    page?: ({ children }: { children?: ReactNode }) => React.ReactNode;
};


export default function Message({ role, text }: Props) {


    const markdownComponents: CustomComponents = {

        page: ({ children }) => (
            <span className="ml-1 rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-300">
                📄 {children}
            </span>
        ),


        h1: ({ children }) => (
            <h1 className="mb-4 text-3xl font-bold">
                {children}
            </h1>
        ),


        h2: ({ children }) => (
            <h2 className="mt-6 mb-3 text-2xl font-semibold">
                {children}
            </h2>
        ),


        h3: ({ children }) => (
            <h3 className="mt-5 mb-2 text-xl font-semibold">
                {children}
            </h3>
        ),


        p: ({ children }) => (
            <p className="mb-4 leading-7">
                {children}
            </p>
        ),


        ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6">
                {children}
            </ul>
        ),


        ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6">
                {children}
            </ol>
        ),


        strong: ({ children }) => (
            <strong className="font-bold text-purple-300">
                {children}
            </strong>
        ),

    };


    const user = role === "user";


    return (
        <div
            className={`flex ${
                user ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`max-w-2xl rounded-xl p-4 ${
                    user
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-white"
                }`}
            >

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={markdownComponents}
                >
                    {text}
                </ReactMarkdown>

            </div>

        </div>
    );
}
import { useState } from "react";

interface Source {
filename: string;
page: number;
similarity: number;
}

interface Props {
sources: Source[];
}

export default function Sources({ sources }: Props) {


const [open, setOpen] = useState(false);

if (!sources.length) return null;

return (
    <div className="mt-4 rounded-lg bg-zinc-900">

        <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between p-4 text-white hover:bg-zinc-800 rounded-lg"
        >
            <span>
                📄 Sources ({sources.length})
            </span>

            <span>
                {open ? "▲" : "▼"}
            </span>
        </button>

        {open && (
            <div className="space-y-2 px-4 pb-4">

                {sources.map((source, index) => (

                    <div
                        key={index}
                        className="rounded-lg bg-zinc-800 p-3 text-sm"
                    >

                        <p className="text-white">
                            {source.filename}
                        </p>

                        <p className="text-zinc-400">
                            Page {source.page}
                        </p>

                        <p className="text-zinc-400">
                            {(source.similarity * 100).toFixed(1)}% match
                        </p>

                    </div>

                ))}

            </div>
        )}

    </div>
);


}

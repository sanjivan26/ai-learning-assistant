import { BrainCircuit, Sparkles } from "lucide-react";

export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

            {/* Logo */}

            <div className="flex items-center gap-3">

                <div className="rounded-lg bg-purple-600 p-2">

                    <BrainCircuit size={24} className="text-white" />

                </div>

                <div>

                    <h1 className="text-xl font-bold text-white">
                        ScholarAI
                    </h1>

                    <p className="text-xs text-zinc-400">
                        AI Research Assistant
                    </p>

                </div>

            </div>

            {/* Status */}

            <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2">

                <Sparkles
                    size={16}
                    className="text-purple-400"
                />

                <span className="text-sm text-zinc-300">

                    Powered by Gemini

                </span>

            </div>

        </header>
    );
}
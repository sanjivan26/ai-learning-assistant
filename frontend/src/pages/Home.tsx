import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import MainPanel from "../components/layout/MainPanel";

export default function Home() {
    return (
        <div className="h-screen bg-zinc-950 text-white">
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />
                <MainPanel />
            </div>
        </div>
    );
}
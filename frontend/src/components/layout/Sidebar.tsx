import UploadButton from "../documents/UploadButton";
import DocumentList from "../documents/DocumentList";

export default function Sidebar() {

    return (

        <aside className="w-72 border-r border-zinc-800 bg-zinc-900 p-4">

            <UploadButton />

            <h2 className="mt-6 mb-4 text-lg font-semibold">

                Documents

            </h2>

            <DocumentList />

        </aside>

    );

}
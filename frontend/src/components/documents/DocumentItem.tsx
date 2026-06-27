interface Props {

    document: {

        document_id: string;

        filename: string;

    };

    onDelete: (id:string)=>void;

}


export default function DocumentItem({
    document,
    onDelete
}:Props){

    return (

        <div className="bg-red-500 p-4 rounded-lg">

            <p className="text-white">
                {document.filename}
            </p>


            <button
                onClick={() =>
                    onDelete(document.document_id)
                }
            >
                Delete
            </button>

        </div>

    );

}
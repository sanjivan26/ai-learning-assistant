interface Source {

    filename: string;

    page: number;

    similarity: number;

}


interface Props {

    sources: Source[];

}


export default function Sources({

    sources

}: Props) {


    if (!sources.length) {

        return null;

    }


    return (

        <div className="mt-4 rounded-lg bg-zinc-900 p-4">


            <h3 className="mb-3 font-semibold text-white">

                Sources

            </h3>



            <div className="space-y-2">


                {sources.map((source, index) => (


                    <div

                        key={index}

                        className="rounded-lg bg-zinc-800 p-3 text-sm"

                    >

                        <p className="text-white">

                            📄 {source.filename}

                        </p>


                        <p className="text-zinc-400">

                            Page: {source.page}

                        </p>


                        <p className="text-zinc-400">

                            Match: {(source.similarity * 100).toFixed(1)}%

                        </p>


                    </div>


                ))}


            </div>


        </div>

    );

}
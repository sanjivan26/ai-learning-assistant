import { useRef } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadDocument } from "../../api/documents";

export default function UploadButton() {

    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({

        mutationFn: uploadDocument,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["documents"],

            });

        },

    });

    function handleChange(

        e: React.ChangeEvent<HTMLInputElement>

    ) {

        if (!e.target.files?.length) return;

        mutation.mutate(e.target.files[0]);

    }

    return (

        <>

            <input

                hidden

                type="file"

                accept=".pdf"

                ref={inputRef}

                onChange={handleChange}

            />

            <button

                onClick={() => inputRef.current?.click()}

                className="w-full rounded-lg bg-purple-600 py-3 hover:bg-purple-700"

            >

                Upload PDF

            </button>

        </>

    );

}
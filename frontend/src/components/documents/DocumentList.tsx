import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getDocuments, deleteDocument } from "../../api/documents";

import DocumentItem from "./DocumentItem";

export default function DocumentList() {

    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({

        queryKey: ["documents"],

        queryFn: getDocuments,

    });

    const mutation = useMutation({

        mutationFn: deleteDocument,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["documents"],

            });

        },

    });

    if (isLoading) {

        return <p>Loading...</p>;

    }

    return (

        <div className="space-y-3">

            {data.map((doc: any) => (

                <DocumentItem

                    key={doc.document_id}

                    document={doc}

                    onDelete={(id) => mutation.mutate(id)}

                />

            ))}

        </div>

    );

}
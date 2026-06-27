class ChunkService:

    @staticmethod
    def chunk_pages(
        pages,
        chunk_size=500,
        overlap=100
    ):

        chunks = []

        for page in pages:

            paragraphs = [
                p.strip()
                for p in page["text"].split("\n\n")
                if p.strip()
            ]

            for paragraph in paragraphs:

                words = paragraph.split()

                if len(words) <= chunk_size:

                    chunks.append({

                        "page": page["page"],

                        "text": paragraph

                    })

                    continue

                start = 0

                while start < len(words):

                    end = start + chunk_size

                    chunks.append({

                        "page": page["page"],

                        "text": " ".join(words[start:end])

                    })

                    start += chunk_size - overlap

        return chunks
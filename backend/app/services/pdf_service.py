import fitz


class PDFService:

    @staticmethod
    def extract_pages(pdf_path: str):

        document = fitz.open(pdf_path)

        pages = []

        for index, page in enumerate(document):

            text = page.get_text()

            pages.append({
                "page": index + 1,
                "text": text
            })

        document.close()

        return pages
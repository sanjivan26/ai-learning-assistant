import google.generativeai as genai

from app.core.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


class GeminiService:

    @staticmethod
    def answer(question: str, context: str, history):

        prompt = f"""
You are ScholarAI.

You answer questions ONLY using the supplied context.

Rules:

- Never invent information.
- Never use outside knowledge.
- If the answer cannot be found in the context, reply exactly:
"I couldn't find that information in the uploaded documents."
- When answering, mention the page numbers whenever possible.
- Keep answers clear and concise.

{history}

=========================

Context:

{context}

=========================

Question:

{question}

=========================

Answer:
"""

        response = model.generate_content(prompt)

        return response.text
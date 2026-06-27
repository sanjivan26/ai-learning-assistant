from google import genai

print("genai:", dir(genai))

client = genai.Client(api_key="dummy")

print("Client:", type(client))
print("Models:", dir(client.models))
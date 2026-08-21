from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import json
import os

app = FastAPI()

# Allow frontend to connect smoothly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Shopkeeper OS Backend Running"}

@app.post("/api/ocr-bill")
async def parse_bill_ocr(file: UploadFile = File(...)):
    """
    Reads uploaded paper bill image and extracts items.
    Has a built-in fallback so your demo never breaks even if API key is missing!
    """
    try:
        # Check if Gemini API Key exists
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            from google import genai
            client = genai.Client(api_key=api_key)
            
            image_bytes = await file.read()
            image = Image.open(io.BytesIO(image_bytes))

            prompt = """
            Extract items from this supplier bill image.
            Return ONLY a raw JSON array of objects with keys: "name", "quantity", "price".
            Example format: [{"name": "Sugar 1kg", "quantity": 10, "price": 420}]
            """

            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[image, prompt]
            )
            
            clean_json_str = response.text.replace("```json", "").replace("```", "").strip()
            parsed_items = json.loads(clean_json_str)
            return {"status": "success", "extracted_items": parsed_items}
        else:
            raise Exception("No API key provided, using fallback demo data.")

    except Exception as e:
        # Fallback Mock Data for safe hackathon live demo
        return {
            "status": "demo_fallback",
            "extracted_items": [
                {"name": "Tata Salt 1kg", "quantity": 20, "price": 500},
                {"name": "Maggi 2-Min Noodle Pack", "quantity": 15, "price": 210},
                {"name": "Fortune Sunlite Oil 1L", "quantity": 10, "price": 1350}
            ]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
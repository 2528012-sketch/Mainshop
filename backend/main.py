from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import json

app = FastAPI(title="SmartDukaan OCR Microservice")

# Allow frontend to connect smoothly without CORS errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "SmartDukaan OCR Microservice Running"}

@app.post("/api/ocr-bill")
async def parse_bill_ocr(file: UploadFile = File(...)):
    """
    Reads uploaded paper bill image or document, extracts line items via Gemini 2.5 Flash,
    and returns structured JSON data. Includes a built-in fallback for safe hackathon demos.
    """
    try:
        # 1. Read file bytes
        image_bytes = await file.read()
        
        # 2. Hardcoded Gemini API Key
        api_key = "AQ.Ab8RN6IkH4I__SRc216J5ekP-d5W_weQHrEXTFKVzI70w7bXEQ"
        
        if api_key:
            from google import genai
            client = genai.Client(api_key=api_key)
            
            # Open image using Pillow
            image = Image.open(io.BytesIO(image_bytes))

            prompt = """
            Extract items from this supplier bill or invoice image.
            Return ONLY a raw JSON array of objects with keys: "name", "quantity", "price".
            Do not include any extra text or conversational markdown wrappers other than the JSON block.
            Example format: [{"name": "Sugar 1kg", "quantity": 10, "price": 420}]
            """

            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=[image, prompt]
            )
            
            # Clean response text to extract pure JSON
            clean_json_str = response.text.replace("```json", "").replace("```", "").strip()
            parsed_items = json.loads(clean_json_str)
            
            return {
                "status": "success", 
                "source": "gemini-ai-vision",
                "extracted_items": parsed_items
            }
        else:
            raise HTTPException(status_code=400, detail="API key is missing.")

    except Exception as e:
        # Robust Fallback Mock Data for safe hackathon live demo if parsing or network fails
        print(f"⚠️ OCR warning: {e}. Falling back to demo mock data.")
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
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
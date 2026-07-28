from fastapi import FastAPI, UploadFile, File

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Textile AI Service is running"
    }


@app.post("/predict/fabric")
async def predict_fabric(
    file: UploadFile = File(...)
):

    return {
        "prediction": "Cotton",
        "confidence": "97%"
    }
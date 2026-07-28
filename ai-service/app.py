from fastapi import FastAPI, UploadFile, File
from PIL import Image
import tensorflow as tf
import numpy as np
import io

app = FastAPI()

# Load the trained model
model = tf.keras.models.load_model(
    "models/fabric_classifier.keras"
)

# Load the class names
with open(
    "models/fabric_classes.txt",
    "r"
) as file:

    class_names = [
        line.strip()
        for line in file.readlines()
    ]


@app.get("/")
def home():

    return {
        "message": "Textile AI Service is running",
        "model": "Fabric Classification Model"
    }


@app.post("/predict/fabric")
async def predict_fabric(
    file: UploadFile = File(...)
):

    # Read uploaded image
    image_data = await file.read()

    # Open image
    image = Image.open(
        io.BytesIO(image_data)
    )

    # Convert image to RGB
    image = image.convert("RGB")

    # Resize image
    image = image.resize(
        (224, 224)
    )

    # Convert image to NumPy array
    image_array = np.array(
        image,
        dtype=np.float32
    )

    # Add batch dimension
    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # Get model prediction
    predictions = model.predict(
        image_array,
        verbose=0
    )

    # Get class with highest probability
    predicted_index = int(
        np.argmax(predictions[0])
    )

    predicted_class = class_names[
        predicted_index
    ]

    confidence = float(
        predictions[0][predicted_index]
        * 100
    )

    return {
        "filename": file.filename,
        "prediction": predicted_class,
        "confidence": round(
            confidence,
            2
        )
    }
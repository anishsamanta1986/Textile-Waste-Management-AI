from fastapi import FastAPI, UploadFile, File
from PIL import Image
import tensorflow as tf
import numpy as np
import io

# Create FastAPI application
app = FastAPI(
    title="Textile Waste Management AI Service"
)


# ==================================================
# LOAD FABRIC CLASSIFICATION MODEL
# ==================================================

fabric_model = tf.keras.models.load_model(
    "models/fabric_classifier.keras"
)

# Load Fabric Classification class names
with open(
    "models/fabric_classes.txt",
    "r"
) as file:

    fabric_class_names = [
        line.strip()
        for line in file.readlines()
    ]


# ==================================================
# LOAD FABRIC DEFECT CLASSIFICATION MODEL
# ==================================================

defect_model = tf.keras.models.load_model(
    "models/fabric_defect_classifier.keras"
)

# Load Fabric Defect class names
with open(
    "models/fabric_defect_classes.txt",
    "r"
) as file:

    defect_class_names = [
        line.strip()
        for line in file.readlines()
    ]


# ==================================================
# HOME ENDPOINT
# ==================================================

@app.get("/")
def home():

    return {
        "message": "Textile Waste Management AI Service is running",
        "available_models": [
            "Fabric Classification",
            "Fabric Defect Classification"
        ]
    }


# ==================================================
# FABRIC CLASSIFICATION ENDPOINT
# ==================================================

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

    # Resize image for MobileNetV2
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

    # Get prediction
    predictions = fabric_model.predict(
        image_array,
        verbose=0
    )

    # Find class with highest probability
    predicted_index = int(
        np.argmax(predictions[0])
    )

    predicted_class = fabric_class_names[
        predicted_index
    ]

    # Calculate confidence percentage
    confidence = float(
        predictions[0][predicted_index]
        * 100
    )

    # Return prediction
    return {
        "filename": file.filename,
        "prediction": predicted_class,
        "confidence": round(
            confidence,
            2
        )
    }


# ==================================================
# FABRIC DEFECT CLASSIFICATION ENDPOINT
# ==================================================

@app.post("/predict/defect")
async def predict_defect(
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

    # Resize image for MobileNetV2
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

    # Get prediction
    predictions = defect_model.predict(
        image_array,
        verbose=0
    )

    # Find class with highest probability
    predicted_index = int(
        np.argmax(predictions[0])
    )

    predicted_class = defect_class_names[
        predicted_index
    ]

    # Calculate confidence percentage
    confidence = float(
        predictions[0][predicted_index]
        * 100
    )

    # Return prediction
    return {
        "filename": file.filename,
        "prediction": predicted_class,
        "confidence": round(
            confidence,
            2
        )
    }
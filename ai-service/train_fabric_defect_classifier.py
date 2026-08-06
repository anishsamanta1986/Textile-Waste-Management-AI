import os
import tensorflow as tf
from tensorflow.keras import layers, models

# Dataset path
DATASET_PATH = os.path.join(
    "AI_DATASETS",
    "Fabric Defect"
)

# Model settings
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 15

# Load training dataset
train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

# Load validation dataset
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

# Get class names automatically from folder names
class_names = train_dataset.class_names

print("\nFabric defect classes:")
print(class_names)

# Improve data loading performance
AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(AUTOTUNE)

validation_dataset = validation_dataset.prefetch(AUTOTUNE)

# Load pretrained MobileNetV2
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze pretrained layers
base_model.trainable = False

# Build the model
inputs = layers.Input(
    shape=(224, 224, 3)
)

# MobileNetV2 image preprocessing
x = tf.keras.applications.mobilenet_v2.preprocess_input(
    inputs
)

# Extract image features
x = base_model(
    x,
    training=False
)

# Convert feature maps into a feature vector
x = layers.GlobalAveragePooling2D()(x)

# Reduce overfitting
x = layers.Dropout(0.3)(x)

# Final classification layer
outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(x)

# Create the complete model
model = models.Model(
    inputs,
    outputs
)

# Compile the model
model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Show model details
model.summary()

# Stop early if validation accuracy stops improving
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor="val_accuracy",
    patience=4,
    restore_best_weights=True
)

# Train the model
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS,
    callbacks=[
        early_stopping
    ]
)

# Create the models folder if it does not exist
os.makedirs(
    "models",
    exist_ok=True
)

# Save the trained model
model.save(
    "models/fabric_defect_classifier.keras"
)

# Save class names
with open(
    "models/fabric_defect_classes.txt",
    "w"
) as file:

    for class_name in class_names:
        file.write(
            class_name + "\n"
        )

print(
    "\nFabric Defect model training completed."
)

print(
    "Model saved at:"
)

print(
    "models/fabric_defect_classifier.keras"
)
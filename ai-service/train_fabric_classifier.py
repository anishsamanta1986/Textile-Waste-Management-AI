import os
import tensorflow as tf
from tensorflow.keras import layers, models

# Dataset path
DATASET_PATH = os.path.join(
    "AI_DATASETS",
    "Fabric Classification"
)

# Settings
IMAGE_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 12

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

# Get class names
class_names = train_dataset.class_names

print("\nFabric classes:")
print(class_names)

# Improve dataset performance
AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(
    AUTOTUNE
)

validation_dataset = validation_dataset.prefetch(
    AUTOTUNE
)

# Load pretrained MobileNetV2
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Keep pretrained layers unchanged
base_model.trainable = False

# Build transfer-learning model
inputs = layers.Input(
    shape=(224, 224, 3)
)

x = tf.keras.applications.mobilenet_v2.preprocess_input(
    inputs
)

x = base_model(
    x,
    training=False
)

x = layers.GlobalAveragePooling2D()(
    x
)

x = layers.Dropout(0.3)(
    x
)

outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(
    x
)

model = models.Model(
    inputs,
    outputs
)

# Compile model
model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Show model information
model.summary()

# Stop if validation accuracy stops improving
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor="val_accuracy",
    patience=3,
    restore_best_weights=True
)

# Train
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS,
    callbacks=[
        early_stopping
    ]
)

# Create models folder
os.makedirs(
    "models",
    exist_ok=True
)

# Save model
model.save(
    "models/fabric_classifier.keras"
)

# Save class names
with open(
    "models/fabric_classes.txt",
    "w"
) as file:

    for class_name in class_names:
        file.write(
            class_name + "\n"
        )

print(
    "\nImproved training completed."
)

print(
    "Model saved at:"
)

print(
    "models/fabric_classifier.keras"
)
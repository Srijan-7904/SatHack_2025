from flask import Flask, request, render_template, jsonify, Response
import os
import numpy as np
from keras.models import load_model
from keras.utils import load_img, img_to_array
import base64
import requests
from flask_cors import CORS
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ---------------------------
# Load ML Model
# ---------------------------
MODEL_PATH = "model/plant_model.h5"
model = load_model(MODEL_PATH)

class_names = ["Potato__Early_blight", "Potato_Late_blight", "Potato__healthy"]

# ---------------------------
# GLOBAL VARIABLE TO STORE LATEST RESULT
# ---------------------------
latest_result = {
    "prediction": None,
    "confidence": None
}

# ---------------------------
# Prediction Function
# ---------------------------
def predict_disease(img_path):
    img = load_img(img_path, target_size=(256, 256))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = round(100 * np.max(predictions), 2)

    return predicted_class, confidence

# ---------------------------
# ROUTES
# ---------------------------
@app.route("/")
def index():
    return render_template("index.html")

# Camera Feed Proxy
@app.route("/camera_feed")
def camera_feed():
    esp_url = "http://192.168.137.16:5000/video_feed"
    r = requests.get(esp_url, stream=True)

    return Response(
        r.iter_content(chunk_size=1024),
        content_type=r.headers.get("Content-Type", "multipart/x-mixed-replace; boundary=frame"),
        headers={"Access-Control-Allow-Origin": "*"}
    )

# NORMAL FILE UPLOAD PREDICT
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    prediction, confidence = predict_disease(filepath)

    latest_result["prediction"] = prediction
    latest_result["confidence"] = confidence

    return jsonify({
        "prediction": prediction,
        "confidence": confidence,
        "image_path": filepath
    })

# BASE64 PREDICT
@app.route("/predict_base64", methods=["POST"])
def predict_base64():
    data = request.json.get("image")

    if data is None:
        return jsonify({"error": "No image received"}), 400

    try:
        header, encoded = data.split(",", 1)
        image_bytes = base64.b64decode(encoded)

        img = Image.open(io.BytesIO(image_bytes)).resize((256, 256))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = round(100 * np.max(predictions), 2)

        latest_result["prediction"] = predicted_class
        latest_result["confidence"] = confidence

        return jsonify({
            "prediction": predicted_class,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET LATEST RESULT
@app.route("/latest_prediction", methods=["GET"])
def latest_prediction():
    if latest_result["prediction"] is None:
        return jsonify({"message": "No prediction yet"}), 200

    return jsonify(latest_result)


# ---------------------------
# RUN APP (Normal Mode)
# ---------------------------
if __name__ == "__main__":
    app.run()

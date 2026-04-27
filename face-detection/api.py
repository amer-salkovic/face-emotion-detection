import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify, make_response
from deepface import DeepFace

# Isključujemo suvišne TensorFlow logove
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        return make_response("", 200)

    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"status": "error", "message": "Nema slike"}), 400

        # Dekodiranje slike
        img_b64 = data['image'].split(",")[1]
        img_bytes = base64.b64decode(img_b64)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # AI ANALIZA (DeepFace na dijeti)
        analysis = DeepFace.analyze(
            img_path = frame, 
            actions = ['emotion'],
            enforce_detection = False,
            detector_backend = 'opencv', # Najlakši za RAM
            silent = True
        )
        
        result = analysis[0]
        return jsonify({
            "status": "success",
            "emotion": result['dominant_emotion'],
            "confidence": round(float(result['emotion'][result['dominant_emotion']]), 2)
        })

    except Exception as e:
        print(f"AI Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
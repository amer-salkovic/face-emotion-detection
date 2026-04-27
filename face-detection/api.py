import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"status": "error", "message": "No image data"}), 400
        
        # Dekodiranje base64 slike sa frontenda
        img_b64 = data['image'].split(",")[1]
        img_bytes = base64.b64decode(img_b64)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # AI Analiza
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        result = analysis[0]
        dominant = result['dominant_emotion']
        conf = float(result['emotion'][dominant])
        
        return jsonify({
            "status": "success",
            "emotion": dominant,
            "confidence": round(conf, 2)
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)
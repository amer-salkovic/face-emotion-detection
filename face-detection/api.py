import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify, make_response
from fer import FER

# Isključujemo suvišne TensorFlow logove
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

app = Flask(__name__)

# Inicijalizujemo detektor jednom pri pokretanju (lakša verzija)
detector = FER(mtcnn=False)

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

        # AI ANALIZA (Pomoću FER biblioteke koja je lagana)
        # Vraća listu detektovanih lica i njihovih emocija
        results = detector.detect_emotions(frame)
        
        if not results:
            return jsonify({"status": "success", "emotion": "neutral", "confidence": 0.0})

        # Uzimamo dominantnu emociju prvog detektovanog lica
        emotions = results[0]["emotions"]
        dominant_emotion = max(emotions, key=emotions.get)
        confidence = round(float(emotions[dominant_emotion]), 2)

        return jsonify({
            "status": "success",
            "emotion": dominant_emotion,
            "confidence": confidence
        })

    except Exception as e:
        print(f"AI Error: {str(e)}")
        return jsonify({"status": "error", "message": "Neural Engine memory pressure. Try again."}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
import time as python_time
import os
from flask import Flask, jsonify
from flask_cors import CORS
import cv2
from deepface import DeepFace

app = Flask(__name__)

# CORS Configuration for Production
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:3000", "https://your-frontend.vercel.app"]
}})

# Load Face Cascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/analyze', methods=['GET'])
def analyze():
    """
    Captures frame, detects faces, and analyzes emotions.
    """
    cap = cv2.VideoCapture(0)

    # Camera Warm-up (Important for lighting)
    for _ in range(15):
        cap.read()
        python_time.sleep(0.05)
    
    ret, frame = cap.read()
    cap.release() 

    if not ret:
        return jsonify({"status": "error", "message": "Camera access failed"}), 500

    # Save debug image
    cv2.imwrite("test_api.jpg", frame)
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    if len(faces) == 0:
        return jsonify({
            "status": "success", 
            "emotion": "No faces detected", 
            "confidence": 0
        })

    # Process only the first detected face
    x, y, w, h = faces[0]
    face_roi = frame[y:y+h, x:x+w]

    try:
        # AI Analysis
        analysis = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
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
    # Dinamički port za Cloud servise (Render/Railway)
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)
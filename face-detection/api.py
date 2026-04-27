import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response, 200

    try:
        data = request.get_json()
        img_b64 = data['image'].split(",")[1]
        img_bytes = base64.b64decode(img_b64)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # DEBUG LOG: Proveravamo da li je slika stigla
        height, width, _ = frame.shape
        print(f"Debug: Primljena slika velicine {width}x{height}")

        # OVDE ISKLJUČUJEMO DEEPFACE ZA TEST
        # dominant = "Testing..." 
        
        return jsonify({
            "status": "success",
            "emotion": "debug-mode-active",
            "confidence": 0.99
        })

    except Exception as e:
        print(f"Debug Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)

# 1. DOZVOLJAVAMO SVE (Bukvalno sve)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    # 2. RUČNI ODGOVOR NA OPTIONS
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    try:
        data = request.get_json()
        
        # DEBUG LOG: Ovo ćemo gledati u Render logovima
        print("Debug: Zahtev primljen uspešno!")
        
        # Test povratna informacija bez ikakve obrade slike
        return jsonify({
            "status": "success",
            "emotion": "CORS-FIXED",
            "confidence": 1.0
        })

    except Exception as e:
        print(f"Debug Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
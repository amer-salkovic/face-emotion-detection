import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
# Dozvoljavamo sve, ali dodajemo i ručna zaglavlja za svaki slučaj
CORS(app, supports_credentials=True)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

@app.route('/analyze', methods=['POST'])
def analyze():
    # Test odgovor da vidimo da li prolazi
    res = jsonify({"status": "success", "emotion": "CORS_BYPASSED"})
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
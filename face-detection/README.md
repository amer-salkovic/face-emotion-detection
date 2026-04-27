# 🤖 AI-Driven Emotion Analytics Engine

A sophisticated real-time facial expression analysis service. This project demonstrates the seamless integration of **Deep Learning** models within a **RESTful Web Architecture**, specifically optimized for high-performance inference.

## 🌟 Professional Highlights
* **Edge AI Integration:** Implemented real-time computer vision processing using OpenCV and DeepFace.
* **Hybrid Tech Stack:** Bridged the gap between Python's AI ecosystem and modern Web Frontends.
* **Problem Solving:** Engineered custom solutions for JSON serialization of NumPy types and resolved hardware-specific threading issues on Apple Silicon.

## 🛠️ The Tech Stack

### AI & Core Logic
* **Python 3.11** - Core programming language.
* **DeepFace (VGG-Face/RetinaFace)** - State-of-the-art ensemble models for facial attribute analysis.
* **TensorFlow & Keras** - Efficient neural network execution.
* **OpenCV** - Low-level image processing and frame capture optimization.

### API Layer
* **Flask** - Lightweight micro-service architecture.
* **CORS Management** - Secure cross-origin communication protocol.

## 🏗️ System Architecture

1. **Capture:** OpenCV accesses the hardware abstraction layer to grab raw frames.
2. **Preprocessing:** Frames are converted to grayscale and passed through a Haar Cascade classifier for localized face detection.
3. **Inference:** Isolated face regions are fed into the DeepFace neural network.
4. **Serialization:** Custom transformation logic converts NumPy float32 tensors into JSON-compatible formats.
5. **Delivery:** Results are served via a REST endpoint at `5001/analiziraj`.

## ⚙️ Engineering & Setup

### Environment Requirements
- Python 3.11+
- Virtual Environment (venv) for dependency isolation

### Installation
```bash
# Clone the repository
git clone https://github.com/amer-salkovic/face-emotion-detection.git

# Initialize virtual environment
python3 -m venv .venv_ai
source .venv_ai/bin/activate

# Install optimized dependencies
pip install opencv-python deepface flask flask-cors tf-keras
```

### Running the Engine
```bash
python api.py
```

## 📈 Roadmap
[x] Backend API Development

[x] AI Model Optimization

[ ] Next.js Frontend Integration (In Progress)

[ ] Real-time WebSocket streaming for lower latency

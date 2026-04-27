# Projects Directory

This directory contains Python projects focused on AI and computer vision.

## Project Structure

```
projects/
├── face-detection/
│   ├── kamera.py                 # Real-time face detection application
│   ├── api.py                    # Flask API for emotion analysis
│   ├── README.md
│   └── requirements.txt
│
└── python-learning-archive.md    # Archived Python learning documentation
```

## Projects

### Face Detection & Emotion Analysis
Real-time face detection and emotion analysis using OpenCV and DeepFace.

**Features:**
- Real-time face detection with Haar Cascade
- Emotion analysis using DeepFace AI models
- Flask REST API for web integration
- OpenCV camera capture and processing

**Run the desktop app:**
```bash
cd face-detection
python kamera.py
```

**Run the API server:**
```bash
cd face-detection
python api.py
```

## Setup

Each project has its own `requirements.txt`. Install dependencies:

```bash
cd face-detection
pip install -r requirements.txt
```

## Archived Projects

- **Python Learning**: Basic Python syntax comparison for JavaScript developers (archived in `python-learning-archive.md`)

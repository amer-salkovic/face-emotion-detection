import cv2
from deepface import DeepFace

# Load the pre-trained Haar Cascade classifier for face detection
# This classifier is trained to recognize face patterns in images
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Initialize webcam capture (0 = default camera device)
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Camera not available")
    exit()

# Main event loop - continues until user exits
while cap.isOpened():
    # ret = success flag, frame = the captured image
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert to grayscale - Haar Cascade classifier works more efficiently with grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the current frame
    # scaleFactor: image scale reduction per iteration (smaller = more accurate but slower)
    # minNeighbors: how many neighbors each candidate must have (higher = fewer false positives)
    # minSize: minimum face size to detect
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4, minSize=(30, 30))
    
    face_crop = None
    
    # Process detected faces
    for (x, y, w, h) in faces:
        # Draw a blue rectangle around the detected face
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        
        # Constrain coordinates to prevent array index out of bounds
        # Make sure the crop region doesn't exceed frame boundaries
        x = max(0, x)
        y = max(0, y)
        w = min(frame.shape[1] - x, w)
        h = min(frame.shape[0] - y, h)
        
        # Extract the face region if it's valid
        if w > 0 and h > 0:
            face_crop = frame[y:y+h, x:x+w]
            break  # Only process first detected face
    
    # Display the cropped face if one was detected
    if face_crop is not None:
        cv2.imshow("Face Crop", face_crop)
    else:
        # Hide the window if no face is currently detected
        try:
            cv2.destroyWindow("Face Crop")
        except:
            pass  # Window may not exist yet
    
    # Display the main frame with face rectangles
    cv2.imshow("Face Detection", frame)
    
    # Get keyboard input (wait 1ms for a key press)
    # Store it in a variable to avoid reading multiple times in same iteration
    key = cv2.waitKey(1) & 0xFF
    
    # Check if user pressed 'q' to quit
    if key == ord('q'):
        break
    # Check if user pressed 's' to save and analyze the detected face
    elif key == ord('s') and face_crop is not None:
        # Save the detected face image to disk
        cv2.imwrite("detected_face.jpg", face_crop)
        print("Face successfully captured and saved!")

        try:
            # Use DeepFace to analyze emotions in the saved face image
            # This uses a deep learning model trained to recognize 7 emotions
            results = DeepFace.analyze(img_path="detected_face.jpg", actions=['emotion'], enforce_detection=False)

            # Extract the dominant emotion and confidence score
            dominant_emotion = results[0]['dominant_emotion']
            confidence = results[0]['emotion'][dominant_emotion]

            # Display the analysis results
            print(f">>> RESULT: {dominant_emotion.upper()} (Confidence: {confidence:.2f}%) <<<")

        except Exception as e:
            # Handle any errors during emotion analysis
            print(f"Error analyzing face: {e}")    

# Clean up: release camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
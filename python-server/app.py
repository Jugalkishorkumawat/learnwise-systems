
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import time
import json
import base64
import os
from datetime import datetime

# Create Flask app and enable CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Store attendance records in memory (in production, use a database)
attendance_records = []

# Dictionary to store registered faces
registered_faces = {}

# Initialize face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/')
def index():
    """Test endpoint to check if server is running"""
    return jsonify({
        "status": "success",
        "message": "Face Recognition API is running",
        "version": "1.0.0"
    })

@app.route('/video_feed')
def video_feed():
    """Stream webcam feed with face recognition overlay"""
    return Response(generate_frames(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_attendance')
def get_attendance():
    """Return attendance records"""
    # In a real app, you would filter by date, class, etc.
    return jsonify(attendance_records)

@app.route('/register_face', methods=['POST'])
def register_face():
    """Register a new face for recognition"""
    try:
        data = request.json
        student_id = data.get('student_id')
        name = data.get('name')
        image_data = data.get('image_data')
        
        if not all([student_id, name, image_data]):
            return jsonify({"status": "error", "message": "Missing required fields"}), 400
        
        # Decode base64 image
        image_data = image_data.split(',')[1] if ',' in image_data else image_data
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # In a real app, you would extract face embeddings and store them
        # For this demo, we'll just store the image
        if not os.path.exists('faces'):
            os.makedirs('faces')
            
        cv2.imwrite(f'faces/{student_id}.jpg', img)
        
        registered_faces[student_id] = {
            'name': name,
            'registered_at': datetime.now().isoformat()
        }
        
        return jsonify({
            "status": "success", 
            "message": f"Face registered for {name}"
        })
        
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        }), 500

@app.route('/export_attendance', methods=['GET'])
def export_attendance():
    """Export attendance data as CSV"""
    date = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    
    # Create CSV content
    csv_content = "Name,Time,Course\n"
    for record in attendance_records:
        csv_content += f"{record['name']},{record['time']},{record.get('course', '')}\n"
    
    # In a real app, you would create a proper CSV file
    return Response(
        csv_content,
        mimetype="text/csv",
        headers={"Content-disposition": f"attachment; filename=attendance-{date}.csv"}
    )

def generate_frames():
    """Generate frames from webcam with face recognition"""
    camera = cv2.VideoCapture(0)  # Use default webcam
    
    if not camera.isOpened():
        print("Error: Could not open camera")
        return
    
    # Adjust camera settings if needed
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    
    while True:
        success, frame = camera.read()
        if not success:
            print("Error: Failed to capture image")
            break
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        # Draw rectangle around faces and recognize
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            
            # In a real app, you would do face recognition here
            # For demo, we'll just simulate recognition occasionally
            if len(faces) > 0 and time.time() % 10 < 1:
                # Simulate face recognition
                simulated_names = ["John Doe", "Sarah Johnson", "Michael Brown"]
                detected_name = simulated_names[int(time.time()) % len(simulated_names)]
                
                # Add to attendance records if not already present
                current_time = datetime.now().isoformat()
                
                # Check if this person was already marked in the last minute
                already_marked = False
                for record in attendance_records:
                    if record['name'] == detected_name:
                        record_time = datetime.fromisoformat(record['time'])
                        if (datetime.now() - record_time).total_seconds() < 60:
                            already_marked = True
                            break
                
                if not already_marked:
                    attendance_records.append({
                        "name": detected_name,
                        "time": current_time,
                        "course": "Introduction to Computer Science"
                    })
                    print(f"Marked attendance for {detected_name}")
                    
                # Display name on frame
                cv2.putText(frame, detected_name, (x, y-10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
        
        # Add timestamp to frame
        cv2.putText(frame, datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"),
                    (10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 1)
        
        # Convert frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        
        # Yield frame in HTTP response
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
        # Control frame rate
        time.sleep(0.1)
    
    # Release camera when done
    camera.release()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

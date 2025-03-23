
# Face Recognition Python Server

This is a simple Flask server that provides face recognition functionality for the attendance system.

## Requirements

- Python 3.7+
- OpenCV
- Flask
- Flask-CORS
- Face Recognition library or dlib

## Installation

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install required packages:
   ```
   pip install flask flask-cors opencv-python numpy face-recognition
   ```

## Running the Server

1. Start the server:
   ```
   python app.py
   ```

2. The server will be available at `http://localhost:5000`

## API Endpoints

- `GET /` - Test if the server is running
- `GET /video_feed` - Stream webcam feed with face recognition
- `GET /get_attendance` - Get current attendance records
- `POST /register_face` - Register a new face for recognition
- `GET /export_attendance` - Export attendance data to CSV

## Troubleshooting

- If you see CORS errors, ensure Flask-CORS is correctly set up
- If the webcam isn't working, check your camera permissions
- For dlib/face_recognition installation issues on Windows, you may need to install CMake and Visual C++ Build Tools

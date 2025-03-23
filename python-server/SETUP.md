
# Setting Up the Face Recognition System

This guide will help you set up the face recognition backend server and connect it to your React frontend.

## Step 1: Install Python and Dependencies

1. Make sure you have Python 3.7+ installed on your system
2. Navigate to the `python-server` directory
3. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Step 2: Configure the Frontend

1. Create a `.env` file in your React project root with:
   ```
   VITE_FACE_RECOGNITION_API_URL=http://localhost:5000
   VITE_ENABLE_SIMULATION_MODE=false
   ```

2. If you need to use simulation mode (no Python backend):
   ```
   VITE_ENABLE_SIMULATION_MODE=true
   ```

## Step 3: Start the Backend Server

1. From the `python-server` directory, run:
   ```
   python app.py
   ```
2. The server should start and be available at `http://localhost:5000`
3. Test the connection by opening `http://localhost:5000` in your browser - you should see a JSON response

## Step 4: Start the Frontend

1. In a separate terminal, start your React application:
   ```
   npm run dev
   ```

2. Navigate to the attendance management page and check if the connection works

## Troubleshooting

### If the webcam doesn't work:
- Make sure your browser has camera permissions enabled
- Try a different webcam or check if it works in other applications
- On some systems, you may need to specify the camera index:
  ```python
  # In app.py, change:
  camera = cv2.VideoCapture(0)  # Try 1, 2, etc.
  ```

### If you see CORS errors:
- Make sure the Flask server has CORS properly configured
- Check your browser console for specific error messages
- Try disabling web security in Chrome for testing (not recommended for production):
  ```
  chrome --disable-web-security --user-data-dir="C:/Chrome dev session"
  ```

### If face detection isn't working:
- Check if OpenCV is properly installed
- Make sure the haarcascade file path is correct
- Try adjusting the `scaleFactor` and `minNeighbors` parameters

## Next Steps

- Implement actual face recognition using dlib or face_recognition library
- Add user management for registering new faces
- Connect to a database to store attendance records

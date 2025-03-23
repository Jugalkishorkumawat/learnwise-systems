
/**
 * Face Recognition Service - Integration with Python OpenCV Backend
 * 
 * This service manages communication with the Python face recognition backend.
 * It handles sending video frames, retrieving attendance data, and managing the connection.
 */

import { toast } from "@/components/ui/use-toast";

// Define backend URL with configurable options
const FACE_RECOGNITION_API_URL = import.meta.env.VITE_FACE_RECOGNITION_API_URL || 'http://localhost:5000';

// Timeout for fetch requests in milliseconds
const FETCH_TIMEOUT = 5000;

export interface AttendanceRecord {
  name: string;
  time: string;
  course?: string;
}

/**
 * Service to interact with the Python Face Recognition backend
 */
export const FaceRecognitionService = {
  /**
   * Start the camera stream and face recognition process
   * @returns The stream URL for the video feed
   */
  startCameraStream: (): string => {
    // Return the video feed URL - this will be consumed by an img tag with src attribute
    return `${FACE_RECOGNITION_API_URL}/video_feed`;
  },

  /**
   * Get the current attendance records from the backend
   * @returns Promise with attendance data
   */
  getAttendanceData: async (): Promise<AttendanceRecord[]> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/get_attendance`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      
      const data = await response.json();
      return data as AttendanceRecord[];
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      
      if ((error as Error).name === 'AbortError') {
        console.log('Request timed out');
        toast({
          title: "Connection Timeout",
          description: "Request to face recognition backend timed out. Using simulation mode.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Connection Error",
          description: "Failed to connect to face recognition backend. Using simulation mode.",
          variant: "destructive"
        });
      }
      
      return [];
    }
  },

  /**
   * Test the connection to the Python backend
   * @returns Promise<boolean> - True if connection is successful
   */
  testConnection: async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Error connecting to face recognition backend:', error);
      return false;
    }
  },

  /**
   * Initialize the face recognition system
   * This can be used to prepare the system before starting recognition
   */
  initialize: async (): Promise<boolean> => {
    try {
      // In a real implementation, this would send initialization parameters
      // For now, we'll just test the connection
      return await FaceRecognitionService.testConnection();
    } catch (error) {
      console.error('Error initializing face recognition system:', error);
      return false;
    }
  },

  /**
   * Register a new face to the recognition system
   * @param studentId The ID of the student
   * @param name The name of the student
   * @param imageData Base64 encoded image data
   * @returns Promise<boolean> indicating success or failure
   */
  registerFace: async (studentId: string, name: string, imageData: string): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/register_face`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          name: name,
          image_data: imageData,
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to register face');
      }
      
      return true;
    } catch (error) {
      console.error('Error registering face:', error);
      toast({
        title: "Registration Error",
        description: "Failed to register face. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  },

  /**
   * Export attendance data to CSV
   * @param date The date for which to export attendance
   * @returns Promise<string> URL to download the CSV file
   */
  exportAttendanceData: async (date: string): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/export_attendance?date=${date}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to export attendance data');
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error exporting attendance data:', error);
      toast({
        title: "Export Error",
        description: "Failed to export attendance data. Please try again.",
        variant: "destructive"
      });
      return '';
    }
  }
};

export default FaceRecognitionService;

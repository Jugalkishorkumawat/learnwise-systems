
/**
 * Face Recognition Service - Integration with Python OpenCV Backend
 * 
 * This service manages communication with the Python face recognition backend.
 * It handles sending video frames, retrieving attendance data, and managing the connection.
 */

import { toast } from "@/components/ui/use-toast";

// Define backend URL (should be configured based on environment)
const FACE_RECOGNITION_API_URL = 'http://localhost:5000';

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
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/get_attendance`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      
      const data = await response.json();
      return data as AttendanceRecord[];
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to face recognition backend. Please ensure the Python server is running.",
        variant: "destructive"
      });
      return [];
    }
  },

  /**
   * Test the connection to the Python backend
   * @returns Promise<boolean> - True if connection is successful
   */
  testConnection: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${FACE_RECOGNITION_API_URL}/`);
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
  }
};

export default FaceRecognitionService;

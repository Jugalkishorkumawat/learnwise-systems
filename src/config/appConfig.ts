
/**
 * Application Configuration
 * 
 * Contains all the configuration variables for the application.
 * Values are read from environment variables with fallbacks.
 */

interface AppConfig {
  // API URLs
  faceRecognitionApiUrl: string;
  
  // Feature flags
  enableSimulationMode: boolean;
  
  // Timeouts and limits
  apiRequestTimeout: number;
}

const appConfig: AppConfig = {
  // API URLs with fallbacks to local development servers
  faceRecognitionApiUrl: import.meta.env.VITE_FACE_RECOGNITION_API_URL || 'http://localhost:5000',
  
  // Feature flags
  enableSimulationMode: import.meta.env.VITE_ENABLE_SIMULATION_MODE === 'true' || false,
  
  // Timeouts and limits in milliseconds
  apiRequestTimeout: parseInt(import.meta.env.VITE_API_REQUEST_TIMEOUT || '5000', 10)
};

export default appConfig;

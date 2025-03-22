
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui-custom/Button';
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Camera, CheckCircle, RefreshCcw, User, UserCheck, Video } from 'lucide-react';
import FaceRecognitionService, { AttendanceRecord } from '@/services/faceRecognitionService';
import { toast } from "@/components/ui/use-toast";

interface CameraFeedProps {
  isActive: boolean;
  onStatusChange: (status: 'idle' | 'scanning' | 'error') => void;
}

const CameraFeed = ({ isActive, onStatusChange }: CameraFeedProps) => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [recentDetections, setRecentDetections] = useState<AttendanceRecord[]>([]);
  const [detectionCount, setDetectionCount] = useState(0);

  // Test connection to Python backend
  useEffect(() => {
    const testConnection = async () => {
      if (isActive) {
        setConnectionStatus('connecting');
        try {
          const isConnected = await FaceRecognitionService.testConnection();
          
          if (isConnected) {
            setConnectionStatus('connected');
            setStreamUrl(FaceRecognitionService.startCameraStream());
            onStatusChange('scanning');
            toast({
              title: "Face Recognition Connected",
              description: "Successfully connected to the face recognition system.",
            });
          } else {
            setConnectionStatus('error');
            onStatusChange('error');
            toast({
              title: "Connection Failed",
              description: "Could not connect to face recognition system. Please check if the Python server is running.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error connecting to face recognition system:', error);
          setConnectionStatus('error');
          onStatusChange('error');
        }
      } else {
        // System not active
        setStreamUrl(null);
        onStatusChange('idle');
      }
    };

    testConnection();
  }, [isActive, onStatusChange]);

  // Fetch attendance data at regular intervals
  useEffect(() => {
    if (!isActive || connectionStatus !== 'connected') {
      return;
    }

    const fetchAttendanceData = async () => {
      try {
        const data = await FaceRecognitionService.getAttendanceData();
        
        // Update recent detections (last 5)
        setRecentDetections(data.slice(0, 5));
        setDetectionCount(data.length);
        
        // If we have detections, make sure status is set to scanning
        if (data.length > 0) {
          onStatusChange('scanning');
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    // Fetch immediately and then every 5 seconds
    fetchAttendanceData();
    const interval = setInterval(fetchAttendanceData, 5000);
    
    return () => clearInterval(interval);
  }, [isActive, connectionStatus, onStatusChange]);

  // Simulate face recognition for demo purposes (when no actual Python backend)
  useEffect(() => {
    if (!isActive || connectionStatus !== 'error') {
      return;
    }

    // This is for demo only - simulates face detection events
    const simulateDetection = () => {
      const simulatedNames = ['John Doe', 'Sarah Johnson', 'Michael Brown', 'Emily Davis'];
      const randomName = simulatedNames[Math.floor(Math.random() * simulatedNames.length)];
      const now = new Date().toISOString();
      
      const newDetection: AttendanceRecord = {
        name: randomName,
        time: now,
      };
      
      setRecentDetections(prev => [newDetection, ...prev.slice(0, 3)]);
      setDetectionCount(prev => prev + 1);
      
      toast({
        title: "Face Detected (Simulated)",
        description: `${randomName} has been marked present.`,
      });
    };

    // For demo purposes - simulate a detection every 8-15 seconds
    const simulationInterval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance of detection
        simulateDetection();
      }
    }, 8000 + Math.random() * 7000);
    
    return () => clearInterval(simulationInterval);
  }, [isActive, connectionStatus, onStatusChange]);

  const handleRetryConnection = async () => {
    setConnectionStatus('connecting');
    
    try {
      const isConnected = await FaceRecognitionService.initialize();
      
      if (isConnected) {
        setConnectionStatus('connected');
        setStreamUrl(FaceRecognitionService.startCameraStream());
        onStatusChange('scanning');
        toast({
          title: "Connection Restored",
          description: "Successfully reconnected to the face recognition system.",
        });
      } else {
        setConnectionStatus('error');
        onStatusChange('error');
        toast({
          title: "Reconnection Failed",
          description: "Could not reconnect to face recognition system. The simulation mode will be used instead.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error reconnecting:', error);
      setConnectionStatus('error');
      onStatusChange('error');
    }
  };

  // Render connection status badge
  const renderStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'connecting':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <RefreshCcw className="h-3 w-3 mr-1 animate-spin" />
            Connecting
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Connection Error
          </Badge>
        );
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-primary" />
              Face Recognition Camera Feed
            </CardTitle>
            <CardDescription>
              Live camera feed with automated face recognition
            </CardDescription>
          </div>
          <div>{renderStatusBadge()}</div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Camera Feed */}
          <div className="col-span-2 bg-gray-900 aspect-video flex justify-center items-center p-4">
            {isActive ? (
              connectionStatus === 'connected' && streamUrl ? (
                <img 
                  src={streamUrl} 
                  alt="Camera Feed" 
                  className="max-h-full max-w-full object-contain"
                />
              ) : connectionStatus === 'connecting' ? (
                <div className="text-center p-6">
                  <RefreshCcw className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-300">Connecting to camera feed...</p>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Camera feed unavailable</p>
                  <p className="text-gray-400 text-sm mt-2">Using simulation mode instead</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 bg-gray-800 text-gray-200 border-gray-700"
                    onClick={handleRetryConnection}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Retry Connection
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center p-6">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">Face recognition is inactive</p>
                <p className="text-gray-400 text-sm">Enable the system to start camera feed</p>
              </div>
            )}
          </div>
          
          {/* Recent Detections */}
          <div className="border-l border-gray-200 dark:border-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-medium flex items-center">
                <UserCheck className="mr-2 h-4 w-4 text-green-600" />
                Recent Face Detections
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {detectionCount} students detected today
              </p>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              {isActive ? (
                recentDetections.length > 0 ? (
                  recentDetections.map((detection, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 border-b border-gray-100 dark:border-gray-800 last:border-none"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{detection.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(detection.time).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Present</Badge>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <UserCheck className="h-8 w-8 mx-auto text-muted-foreground opacity-20 mb-2" />
                    <p>No face detections yet</p>
                    <p className="text-xs mt-1">Detections will appear here</p>
                  </div>
                )
              ) : (
                <div className="p-4 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-3" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-secondary/20 text-sm text-muted-foreground px-6 py-3 border-t border-gray-200 dark:border-gray-800">
        {connectionStatus === 'connected' ? (
          <p>
            Face recognition is actively running. Students are automatically being marked present.
          </p>
        ) : connectionStatus === 'error' ? (
          <p>
            Using simulated face detection. Connect the Python backend for actual face recognition.
          </p>
        ) : (
          <p>
            Waiting for face recognition system to connect...
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CameraFeed;

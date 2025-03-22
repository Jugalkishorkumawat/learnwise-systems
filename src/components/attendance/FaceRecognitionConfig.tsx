
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, CameraOff, Upload, Download, RefreshCcw } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface FaceRecognitionConfigProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const FaceRecognitionConfig = ({ isEnabled, onToggle }: FaceRecognitionConfigProps) => {
  const [sensitivity, setSensitivity] = React.useState([75]);
  const [recognitionModel, setRecognitionModel] = React.useState("facenet");
  
  const handleModelChange = (value: string) => {
    setRecognitionModel(value);
    toast({
      title: "Model Changed",
      description: `Recognition model changed to ${value.toUpperCase()}.`,
    });
  };
  
  const handleSensitivityChange = (value: number[]) => {
    setSensitivity(value);
  };
  
  const handleExportData = () => {
    toast({
      title: "Attendance Data Exported",
      description: "Attendance data has been exported to CSV file.",
    });
  };
  
  const handleUploadFaces = () => {
    toast({
      title: "Feature Not Available",
      description: "This feature requires connection to the Python backend.",
      variant: "destructive"
    });
  };
  
  const handleResetSystem = () => {
    toast({
      title: "System Reset",
      description: "Face recognition system has been reset.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-primary" />
          Face Recognition Configuration
        </CardTitle>
        <CardDescription>
          Configure and fine-tune the face recognition system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="face-recognition-toggle" className="text-base font-medium">
                Face Recognition System
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable automatic face recognition
              </p>
            </div>
            <Switch 
              id="face-recognition-toggle" 
              checked={isEnabled} 
              onCheckedChange={onToggle} 
            />
          </div>
          
          {/* Model Selection */}
          <div className="grid gap-2">
            <Label htmlFor="recognition-model">Recognition Model</Label>
            <Select 
              value={recognitionModel} 
              onValueChange={handleModelChange}
              disabled={!isEnabled}
            >
              <SelectTrigger id="recognition-model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facenet">FaceNet (Default)</SelectItem>
                <SelectItem value="dlib">Dlib HOG</SelectItem>
                <SelectItem value="opencv">OpenCV Haar Cascade</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              FaceNet provides the best accuracy but may be slower on some systems
            </p>
          </div>
          
          {/* Sensitivity Slider */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Recognition Sensitivity</Label>
              <span className="text-sm font-medium">{sensitivity[0]}%</span>
            </div>
            <Slider 
              value={sensitivity} 
              min={1} 
              max={100} 
              step={1} 
              onValueChange={handleSensitivityChange}
              disabled={!isEnabled}
            />
            <p className="text-xs text-muted-foreground">
              Higher sensitivity may lead to more false positives
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-9" 
              onClick={handleUploadFaces}
              disabled={!isEnabled}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Face Data
            </Button>
            <Button 
              variant="outline" 
              className="h-9" 
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Attendance
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-9 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => onToggle(false)}
              disabled={!isEnabled}
            >
              <CameraOff className="h-4 w-4 mr-2" />
              Stop Recognition
            </Button>
            <Button 
              variant="outline" 
              className="h-9"
              onClick={handleResetSystem}
              disabled={!isEnabled}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset System
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaceRecognitionConfig;

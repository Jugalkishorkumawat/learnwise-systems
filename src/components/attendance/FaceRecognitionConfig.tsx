
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Download, Upload, RefreshCcw, Bell, Users } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface SystemConfigProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const SystemConfig = ({ isEnabled, onToggle }: SystemConfigProps) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = React.useState("5");
  
  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    toast({
      title: "Notifications Updated",
      description: `Notifications have been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleAutoSaveChange = (value: string) => {
    setAutoSaveInterval(value);
    toast({
      title: "Auto-save Updated",
      description: `Auto-save interval set to ${value} minutes.`,
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "System data export has been initiated.",
    });
  };
  
  const handleImportData = () => {
    toast({
      title: "Import Ready",
      description: "Please select a file to import student data.",
    });
  };
  
  const handleResetSystem = () => {
    toast({
      title: "System Reset",
      description: "All temporary data has been cleared.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5 text-primary" />
          System Configuration
        </CardTitle>
        <CardDescription>
          Configure attendance system settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-toggle" className="text-base font-medium">
                Attendance System
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable the attendance management system
              </p>
            </div>
            <Switch 
              id="system-toggle" 
              checked={isEnabled} 
              onCheckedChange={onToggle} 
            />
          </div>
          
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications-toggle" className="text-base font-medium">
                Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for attendance updates
              </p>
            </div>
            <Switch 
              id="notifications-toggle" 
              checked={notificationsEnabled} 
              onCheckedChange={handleNotificationToggle}
              disabled={!isEnabled}
            />
          </div>
          
          {/* Auto-save Interval */}
          <div className="grid gap-2">
            <Label htmlFor="auto-save">Auto-save Interval</Label>
            <Select 
              value={autoSaveInterval} 
              onValueChange={handleAutoSaveChange}
              disabled={!isEnabled}
            >
              <SelectTrigger id="auto-save">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 minute</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How often attendance data should be automatically saved
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-9" 
              onClick={handleImportData}
              disabled={!isEnabled}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button 
              variant="outline" 
              className="h-9" 
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="h-9 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => onToggle(false)}
              disabled={!isEnabled}
            >
              <Users className="h-4 w-4 mr-2" />
              Stop System
            </Button>
            <Button 
              variant="outline" 
              className="h-9"
              onClick={handleResetSystem}
              disabled={!isEnabled}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemConfig;

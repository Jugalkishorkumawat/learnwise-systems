
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Edit,
  Save,
  Camera,
  Award,
  GraduationCap
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1995-06-15",
    studentId: "STU2024001",
    department: "Computer Science",
    semester: "6th Semester",
    yearOfStudy: "3rd Year",
    bloodGroup: "O+",
    parentName: "Jane Doe",
    parentPhone: "+1 234 567 8901"
  });

  const academicInfo = [
    { label: "CGPA", value: "8.75", icon: Award },
    { label: "Credits Completed", value: "140/180", icon: BookOpen },
    { label: "Attendance", value: "92%", icon: Calendar },
    { label: "Rank", value: "15/120", icon: GraduationCap }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-muted-foreground">Manage your personal information and academic details</p>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-1"
                >
                  <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="relative mx-auto w-32 h-32 mb-4">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                          variant="outline"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
                      <p className="text-muted-foreground mb-2">{profileData.studentId}</p>
                      <Badge variant="outline" className="mb-4">
                        {profileData.department}
                      </Badge>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{profileData.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={profileData.dateOfBirth}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={profileData.address}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bloodGroup">Blood Group</Label>
                          <Input
                            id="bloodGroup"
                            value={profileData.bloodGroup}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="parentName">Parent/Guardian Name</Label>
                          <Input
                            id="parentName"
                            value={profileData.parentName}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, parentName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                          <Input
                            id="parentPhone"
                            value={profileData.parentPhone}
                            disabled={!isEditing}
                            onChange={(e) => setProfileData({...profileData, parentPhone: e.target.value})}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Academic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6"
              >
                <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {academicInfo.map((info, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
                        >
                          <info.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <p className="text-2xl font-bold text-gray-900">{info.value}</p>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Department</Label>
                        <div className="mt-1 p-2 bg-secondary/50 rounded-md">
                          {profileData.department}
                        </div>
                      </div>
                      <div>
                        <Label>Current Semester</Label>
                        <div className="mt-1 p-2 bg-secondary/50 rounded-md">
                          {profileData.semester}
                        </div>
                      </div>
                      <div>
                        <Label>Year of Study</Label>
                        <div className="mt-1 p-2 bg-secondary/50 rounded-md">
                          {profileData.yearOfStudy}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;

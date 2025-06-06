
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckSquare, Users, BarChart4, Clock, FileText, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/layout/PageTransition';

const Attendance = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Feature Spotlight
                </div>
                <h1 className="text-4xl font-bold mb-6">
                  Smart Attendance Management System
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Streamline attendance tracking with our comprehensive digital system designed for schools and colleges. Easy manual marking with real-time analytics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">Contact Sales</Button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video bg-primary/5 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="flex justify-center">
                      <Users className="h-16 w-16 text-primary mb-4" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Digital Attendance System</h3>
                    <p className="text-muted-foreground mb-4">See how our attendance management works</p>
                    <Button>View Demo</Button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full filter blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-full filter blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground">
                Our attendance system offers everything you need for seamless tracking
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <CheckSquare className="h-8 w-8 text-primary" />,
                  title: "Manual Attendance Marking",
                  description: "Quick and easy manual attendance marking with intuitive interface for teachers and administrators."
                },
                {
                  icon: <Calendar className="h-8 w-8 text-primary" />,
                  title: "Real-time Updates",
                  description: "Instant attendance updates with real-time synchronization across all devices and platforms."
                },
                {
                  icon: <BarChart4 className="h-8 w-8 text-primary" />,
                  title: "Analytics & Reports",
                  description: "Comprehensive attendance analytics with detailed reports and trend analysis."
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  title: "Flexible Scheduling",
                  description: "Support for multiple class schedules, periods, and custom attendance policies."
                },
                {
                  icon: <FileText className="h-8 w-8 text-primary" />,
                  title: "Export & Documentation",
                  description: "Export attendance data in multiple formats for documentation and regulatory compliance."
                },
                {
                  icon: <Users className="h-8 w-8 text-primary" />,
                  title: "Student Management",
                  description: "Complete student profile management with attendance history and performance tracking."
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 border border-border rounded-lg bg-card"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Simple and efficient attendance management process
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Student Registration",
                  description: "Register students with complete profiles including contact information, department, and academic details."
                },
                {
                  step: 2,
                  title: "Course & Schedule Setup",
                  description: "Create courses, assign instructors, and set up class schedules for organized attendance tracking."
                },
                {
                  step: 3,
                  title: "Daily Attendance Marking",
                  description: "Teachers mark attendance manually through an intuitive interface with options for present, absent, or late status."
                },
                {
                  step: 4,
                  title: "Real-time Analytics",
                  description: "Generate comprehensive attendance reports with insights into student performance and attendance patterns."
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex mb-8 last:mb-0"
                >
                  <div className="mr-6 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to transform your attendance process?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of educational institutions already using our comprehensive attendance management system.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Footer - simple version */}
        <footer className="bg-background border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} CampusWise. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Attendance;


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle, CheckSquare, BarChart4 } from 'lucide-react';
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
                  AI-Powered Attendance System
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Revolutionize attendance tracking with our facial recognition technology that works with your existing CCTV infrastructure.
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
                      <Camera className="h-16 w-16 text-primary mb-4" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Facial Recognition Demo</h3>
                    <p className="text-muted-foreground mb-4">See how our AI attendance system works</p>
                    <Button>Watch Demo</Button>
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
                  icon: <Camera className="h-8 w-8 text-primary" />,
                  title: "Facial Recognition",
                  description: "Leverage existing CCTV infrastructure to automatically recognize students and mark attendance."
                },
                {
                  icon: <CheckSquare className="h-8 w-8 text-primary" />,
                  title: "Manual Override",
                  description: "Teachers can easily make manual adjustments when necessary."
                },
                {
                  icon: <BarChart4 className="h-8 w-8 text-primary" />,
                  title: "Real-time Analytics",
                  description: "Access attendance trends and insights with comprehensive reports."
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
                Our attendance system integrates seamlessly with your existing infrastructure
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Integration with Existing Cameras",
                  description: "Our system connects to your existing CCTV cameras, eliminating the need for additional hardware installation."
                },
                {
                  step: 2,
                  title: "Facial Recognition Enrollment",
                  description: "Students register their faces securely through a one-time process that stores encrypted facial data."
                },
                {
                  step: 3,
                  title: "Automated Attendance Marking",
                  description: "As students enter the classroom, their faces are recognized and attendance is marked automatically."
                },
                {
                  step: 4,
                  title: "Analytics & Reporting",
                  description: "Generate comprehensive attendance reports for students, classes, and departments with just a few clicks."
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
                Join hundreds of educational institutions already using our AI-powered attendance system.
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

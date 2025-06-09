
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { LucideIcon, ArrowLeft, Clock, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  features?: string[];
}

const FeatureTemplate = ({ 
  title, 
  description, 
  icon: Icon, 
  comingSoon = true,
  features = []
}: FeatureTemplateProps) => {
  const navigate = useNavigate();

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
              <Button
                variant="outline"
                onClick={() => navigate('/comprehensive-dashboard')}
                className="mb-4 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-12">
                  {comingSoon ? (
                    <>
                      <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
                        <Clock className="h-12 w-12 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
                      <p className="text-muted-foreground mb-6">
                        We're working hard to bring you this amazing feature. 
                        Stay tuned for updates!
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
                        <Wrench className="h-12 w-12 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Under Development</h2>
                      <p className="text-muted-foreground mb-6">
                        This feature is currently being developed. 
                        Check back soon for full functionality!
                      </p>
                    </>
                  )}
                  
                  {features.length > 0 && (
                    <div className="text-left mb-6">
                      <h3 className="font-semibold mb-3">Planned Features:</h3>
                      <ul className="space-y-2">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => navigate('/comprehensive-dashboard')}
                    className="mt-4"
                  >
                    Return to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default FeatureTemplate;

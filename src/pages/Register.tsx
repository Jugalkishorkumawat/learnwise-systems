
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import RegisterForm from '@/components/auth/RegisterForm';
import PageTransition from '@/components/layout/PageTransition';

const Register = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border">
            {/* Left column: Decorative */}
            <div className="hidden lg:block relative bg-primary/5 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm"></div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 h-full flex flex-col justify-center"
              >
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Join CampusWise
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Create your account</h2>
                  <p className="text-muted-foreground">
                    Sign up to experience the next generation of campus management.
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Access to all core features</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Role-based access control</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Real-time notifications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Premium support</span>
                  </li>
                </ul>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline underline-offset-4">
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/3 -translate-y-1/3 filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-x-1/3 translate-y-1/3 filter blur-3xl"></div>
            </div>
            
            {/* Right column: Form */}
            <div className="p-8 md:p-12 flex items-center justify-center">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import LoginForm from '@/components/auth/LoginForm';
import PageTransition from '@/components/layout/PageTransition';

const Login = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-background/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border">
            {/* Left column: Form */}
            <div className="p-8 md:p-12 flex items-center justify-center">
              <LoginForm />
            </div>
            
            {/* Right column: Decorative */}
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
                    Welcome Back
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Access your account</h2>
                  <p className="text-muted-foreground">
                    Sign in to manage your campus experience with our comprehensive platform.
                  </p>
                </div>
                
                <div className="border border-primary/20 rounded-xl p-6 bg-white/20 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        "CampusWise has revolutionized how we manage our institution. The AI attendance system alone saved us countless hours."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        — Dr. Sarah Johnson, Principal
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm text-muted-foreground">
                    New to CampusWise?{' '}
                    <Link to="/register" className="font-medium text-primary hover:underline underline-offset-4">
                      Create an account
                    </Link>
                  </p>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/3 -translate-y-1/3 filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-x-1/3 translate-y-1/3 filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;

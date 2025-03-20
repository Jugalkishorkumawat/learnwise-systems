
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui-custom/Button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Logged in as ${userType} with email: ${email}`,
      });
      setIsLoading(false);
      // Add actual login logic here
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Please enter your details to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selector */}
        <div className="bg-background border rounded-lg flex p-1">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              userType === 'student'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              userType === 'staff'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setUserType('staff')}
          >
            Staff
          </button>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Sign in
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?{' '}</span>
          <Link to="/register" className="font-medium text-primary hover:underline underline-offset-4">
            Create account
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;

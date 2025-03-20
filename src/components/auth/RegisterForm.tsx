
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui-custom/Button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: `Registered as ${userType}: ${formData.name}`,
      });
      setIsLoading(false);
      // Add actual registration logic here
    }, 1500);
  };

  // Password strength indicators
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
        <p className="text-muted-foreground mt-2">
          Enter your details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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
          
          {/* Password strength indicators */}
          {formData.password && (
            <div className="mt-2 space-y-2">
              <div className="text-xs text-muted-foreground mb-2">Password requirements:</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center">
                  {hasMinLength ? (
                    <Check size={14} className="mr-2 text-green-500" />
                  ) : (
                    <X size={14} className="mr-2 text-gray-400" />
                  )}
                  <span className={`text-xs ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {hasNumber ? (
                    <Check size={14} className="mr-2 text-green-500" />
                  ) : (
                    <X size={14} className="mr-2 text-gray-400" />
                  )}
                  <span className={`text-xs ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                    Contains a number
                  </span>
                </div>
                <div className="flex items-center">
                  {hasSpecialChar ? (
                    <Check size={14} className="mr-2 text-green-500" />
                  ) : (
                    <X size={14} className="mr-2 text-gray-400" />
                  )}
                  <span className={`text-xs ${hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                    Contains a special character
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              formData.confirmPassword && formData.password !== formData.confirmPassword
                ? 'border-red-500'
                : 'border-input'
            }`}
            required
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
            required
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <Link to="/terms" className="text-primary hover:underline underline-offset-4">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline underline-offset-4">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account?{' '}</span>
          <Link to="/login" className="font-medium text-primary hover:underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;

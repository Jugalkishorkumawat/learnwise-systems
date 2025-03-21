
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui-custom/Button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import UserTypeSelector from './UserTypeSelector';
import PasswordInput from './PasswordInput';
import AuthFooter from './AuthFooter';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const { toast } = useToast();
  const { register } = useAuth();

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
    
    try {
      await register(formData.name, formData.email, formData.password, userType);
      toast({
        title: "Account created!",
        description: `Registered as ${userType}: ${formData.name}`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <UserTypeSelector userType={userType} setUserType={setUserType} />

        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          {/* Password strength indicators */}
          <PasswordStrengthIndicator password={formData.password} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : ''}
            required
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
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
        <AuthFooter 
          text="Already have an account?" 
          linkText="Sign in" 
          linkPath="/login" 
        />
      </form>
    </motion.div>
  );
};

export default RegisterForm;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui-custom/Button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import UserTypeSelector from './UserTypeSelector';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import AuthFooter from './AuthFooter';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, userType);
      toast({
        title: "Success!",
        description: `Logged in as ${userType} with email: ${email}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
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
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Please enter your details to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selector */}
        <UserTypeSelector userType={userType} setUserType={setUserType} />

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <PasswordInput 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          showForgotPassword={true}
        />

        {/* Remember Me */}
        <RememberMeCheckbox />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Sign in
        </Button>

        {/* Sign Up Link */}
        <AuthFooter 
          text="Don't have an account?" 
          linkText="Create account" 
          linkPath="/register" 
        />
      </form>
    </motion.div>
  );
};

export default LoginForm;


import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!password) {
    return null;
  }

  return (
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
  );
};

export default PasswordStrengthIndicator;


import { Link } from 'react-router-dom';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkPath: string;
}

const AuthFooter = ({ text, linkText, linkPath }: AuthFooterProps) => {
  return (
    <div className="text-center text-sm">
      <span className="text-muted-foreground">{text}{' '}</span>
      <Link to={linkPath} className="font-medium text-primary hover:underline underline-offset-4">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;

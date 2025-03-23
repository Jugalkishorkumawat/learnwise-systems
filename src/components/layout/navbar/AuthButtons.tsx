
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/login"
        className="text-foreground/80 hover:text-foreground transition-colors"
      >
        Log in
      </Link>
      <Link
        to="/register"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors btn-hover-effect"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthButtons;

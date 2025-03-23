
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2"
      aria-label="Homepage"
    >
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">C</span>
      </div>
      <span className="font-display font-bold text-xl text-foreground">
        Campus<span className="text-primary">Wise</span>
      </span>
    </Link>
  );
};

export default Logo;

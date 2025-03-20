
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glass?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
}

export const Card = ({
  children,
  className,
  hoverEffect = false,
  glass = false,
  animation = 'none',
  delay = 0
}: CardProps) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay }
        };
      case 'slide':
        return {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.5, delay }
        };
      case 'scale':
        return {
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5, delay }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl border p-6',
        glass ? 'glass dark:glass-dark' : 'bg-card text-card-foreground',
        hoverEffect && 'transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]',
        className
      )}
      {...(animation !== 'none' ? getAnimationProps() : {})}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('pt-0', className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('flex items-center pt-4', className)}>
      {children}
    </div>
  );
};

export default Card;


import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui-custom/Card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  gradient?: string;
  onClick?: () => void;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0, 
  hover = true,
  gradient,
  onClick 
}: AnimatedCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = hover ? {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
      whileTap={{ scale: 0.98 }}
      className={cn("cursor-pointer", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <Card className={cn(
        "overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group",
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )}>
        <div className="relative">
          {children}
        </div>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;

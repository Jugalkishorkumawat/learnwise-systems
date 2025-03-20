
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui-custom/Card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  loading?: boolean;
  delay?: number;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  className,
  trend,
  trendValue,
  loading = false,
  delay = 0
}: DashboardCardProps) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <Card className={cn('overflow-hidden', className)} hoverEffect>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <div className="h-8 w-3/4 bg-muted animate-pulse rounded"></div>
              {description && <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>}
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              {(description || trend) && (
                <div className="flex items-center space-x-2 mt-1">
                  {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                  )}
                  {trend && (
                    <div className={cn("flex items-center text-xs", trendColor)}>
                      {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard;

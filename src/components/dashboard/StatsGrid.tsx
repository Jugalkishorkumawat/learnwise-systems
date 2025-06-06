
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  change: string;
  trend: 'up' | 'down';
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

const StatsGrid = ({ stats, className }: StatsGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {stats.map((stat, index) => (
        <AnimatedCard key={index} delay={index * 0.1}>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div 
                className={`p-2 rounded-lg ${stat.bg}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <motion.p 
                  className="text-xl font-semibold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <motion.div 
                  className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <motion.span
                    animate={{ 
                      y: stat.trend === 'up' ? [-2, 0] : [2, 0],
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {stat.trend === 'up' ? '↗' : '↘'}
                  </motion.span>
                  <span className="ml-1">{stat.change}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </motion.div>
  );
};

export default StatsGrid;

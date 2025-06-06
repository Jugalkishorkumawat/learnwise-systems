
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui-custom/Card';

interface ModuleItem {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  color: string;
  bgGradient: string;
}

interface ModuleGridProps {
  modules: ModuleItem[];
  className?: string;
}

const ModuleGrid = ({ modules, className }: ModuleGridProps) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
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
      {modules.map((module, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -8 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
          onClick={() => navigate(module.route)}
        >
          <Card className={`h-full transition-all duration-500 border-2 ${module.color} hover:shadow-2xl group overflow-hidden relative`}>
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-40`}
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 0.4 }}
              transition={{ duration: 0.3 }}
            />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <motion.div 
                  className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <module.icon className="h-7 w-7 text-primary" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                </motion.div>
              </div>
              
              <motion.h3 
                className="font-semibold text-base mb-2 group-hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                {module.title}
              </motion.h3>
              
              <motion.p 
                className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.15 }}
              >
                {module.description}
              </motion.p>
              
              {/* Subtle animation indicator */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModuleGrid;

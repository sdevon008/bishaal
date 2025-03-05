
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  to,
  className,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "block relative overflow-hidden group transition-all duration-300",
        "border-gradient bg-white p-6 md:p-8 rounded-xl shadow-sm",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 transform translate-x-1/4 -translate-y-1/4">
        <div className="w-full h-full text-nepal-red animate-spin-slow">
          {icon}
        </div>
      </div>
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-3 bg-nepal-red/10 text-nepal-red rounded-lg">
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>
          
          <div className="flex items-center text-nepal-red text-sm font-medium group-hover:underline">
            <span>Use Tool</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;

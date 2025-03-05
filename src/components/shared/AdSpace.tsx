
import React from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
  size: 'banner' | 'sidebar' | 'large-rectangle';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ size, className }) => {
  const sizeStyles = {
    'banner': 'h-[90px] w-full', // 728x90 standard banner
    'sidebar': 'h-[600px] w-[300px]', // 300x600 large skyscraper
    'large-rectangle': 'h-[250px] w-[300px]', // 300x250 medium rectangle
  };
  
  return (
    <div 
      className={cn(
        "bg-gray-100 flex items-center justify-center border border-gray-200 rounded-lg mx-auto overflow-hidden",
        sizeStyles[size],
        className
      )}
    >
      <div className="text-gray-400 text-sm font-medium">
        Ad Space - {size}
      </div>
    </div>
  );
};

export default AdSpace;

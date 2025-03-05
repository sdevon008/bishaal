
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon, 
    disabled, 
    ...props 
  }, ref) => {
    const variantStyles = {
      primary: 'bg-nepal-red text-white hover:bg-nepal-crimson shadow-sm',
      secondary: 'bg-nepal-blue text-white hover:bg-indigo-700 shadow-sm',
      outline: 'border border-nepal-red text-nepal-red hover:bg-nepal-red/5',
      ghost: 'text-nepal-red hover:bg-nepal-red/5',
    };
    
    const sizeStyles = {
      sm: 'py-1.5 px-3 text-sm rounded-md',
      md: 'py-2 px-4 text-base rounded-lg',
      lg: 'py-3 px-6 text-lg rounded-xl',
    };
    
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'font-medium transition-all duration-200 ease-in-out inline-flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-nepal-red/50 focus:ring-offset-2',
          'active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;

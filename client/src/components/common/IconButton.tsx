import React from 'react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
  variant?: 'default' | 'ghost' | 'dark';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  variant = 'default',
  className,
  ...props
}) => {
  const base = 'p-2 rounded-full transition duration-150 flex items-center justify-center active:scale-95';
  const variants = {
    default: 'hover:bg-gray-100 text-gray-800',
    ghost: 'text-gray-600 hover:text-black hover:bg-gray-100',
    dark: 'bg-black/50 hover:bg-black/70 text-white',
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {icon}
    </button>
  );
};

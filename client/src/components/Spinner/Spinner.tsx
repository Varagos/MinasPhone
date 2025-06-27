import React from 'react';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center py-32 ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-primary border-solid ${sizeClasses[size]} border-t-transparent`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

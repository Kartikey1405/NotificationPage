
import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationIconProps {
  className?: string;
  size?: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  className = '', 
  size = 64 
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ripple circles */}
      <div className="absolute inset-0 rounded-full bg-notification-primary opacity-20 animate-ripple-1"></div>
      <div className="absolute inset-0 rounded-full bg-notification-primary opacity-15 animate-ripple-2"></div>
      <div className="absolute inset-0 rounded-full bg-notification-primary opacity-10 animate-ripple-3"></div>
      
      {/* Main circle background */}
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-notification-primary bg-opacity-30">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-notification-accent bg-opacity-50">
          <Bell 
            size={size} 
            className={`text-white glow-effect animate-pulse-glow ${className}`}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationIcon;


import React from 'react';
import { Button } from '@/components/ui/button';

interface NotificationButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  onClick, 
  isLoading = false, 
  disabled = false 
}) => {
  return (
    <Button
      className="w-full h-12 text-white font-medium bg-notification-primary hover:bg-opacity-90 border-none rounded-md transition-all"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Sending...' : 'Send Notification'}
    </Button>
  );
};

export default NotificationButton;

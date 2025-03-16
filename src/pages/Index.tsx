
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import NotificationIcon from '@/components/NotificationIcon';
import NotificationButton from '@/components/NotificationButton';
import { 
  registerServiceWorker, 
  requestNotificationPermission, 
  sendNotification,
  checkNotificationPermission
} from '@/services/notificationService';

const Index = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Register service worker on mount
    const setup = async () => {
      await registerServiceWorker();
      const hasPermission = checkNotificationPermission();
      setPermissionGranted(hasPermission);
    };
    
    setup();
  }, []);

  const handleSendNotification = async () => {
    setIsLoading(true);
    
    try {
      // If we don't have permission yet, request it
      if (!permissionGranted) {
        const granted = await requestNotificationPermission();
        setPermissionGranted(granted);
        
        if (!granted) {
          toast.error('Notification permission denied');
          setIsLoading(false);
          return;
        }
      }
      
      // Send the notification
      const success = await sendNotification('New Notification', {
        body: 'This is a test notification from our app!',
        icon: '/icon-192.png'
      });
      
      if (success) {
        toast.success('Notification sent successfully!');
      } else {
        toast.error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error in notification flow:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Top header */}
      <header className="flex justify-between items-center p-4">
        <span className="text-white font-medium">Hola!</span>
        <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
      </header>
      
      {/* Background gradient circles */}
      <div className="absolute inset-0 notification-gradient z-0"></div>
      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 z-10">
        <div className="mb-12">
          <NotificationIcon />
        </div>
        
        <div className="text-center mb-16 w-full max-w-xs">
          <h1 className="text-2xl font-bold text-white mb-2">Lorem Ipsum...</h1>
          <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet.</p>
        </div>
        
        <div className="w-full max-w-xs">
          <NotificationButton 
            onClick={handleSendNotification} 
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;

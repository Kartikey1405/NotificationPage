
// Check if the browser supports notifications
export const checkNotificationSupport = () => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications');
    return false;
  }
  return true;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!checkNotificationSupport()) return false;

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check if notification permission is already granted
export const checkNotificationPermission = (): boolean => {
  return Notification.permission === 'granted';
};

// Register service worker for PWA
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  console.warn('Service workers are not supported');
  return null;
};

// Send a notification
export const sendNotification = async (title: string, options: NotificationOptions = {}): Promise<boolean> => {
  if (!checkNotificationSupport()) return false;
  
  if (!checkNotificationPermission()) {
    const granted = await requestNotificationPermission();
    if (!granted) return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      body: options.body || 'You have a new notification!',
      icon: options.icon || '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      ...options
    });
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/ngsw-worker.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
          this.subscribeToPushNotifications(registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  private subscribeToPushNotifications(
    registration: ServiceWorkerRegistration
  ) {
    // Request permission and subscribe to push notifications
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          'BHE-5wQEJ-Wu9UgTXXlDYRI2Bakw0IRKtsdKHPdK9mPXleLvbHQoZobIKWFvX3oaqAamdemFCOw5fdwGpR1FG_w',
      })
      .then((subscription) => {
        console.log('Push notification subscription:', subscription);
        this.sendStaticNotification(registration);
      })
      .catch((error) => {
        console.error('Error subscribing to push notifications:', error);
      });
  }

  private sendStaticNotification(registration: ServiceWorkerRegistration) {
    const options = {
      body: 'Push notification works!',
      icon: '/assets/icons/hooray.jpg',
    };

    registration.showNotification('Hooray!!!', options);
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    try {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }

      return outputArray;
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      throw error;
    }
  }
}

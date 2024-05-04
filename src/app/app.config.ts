import {
  ApplicationConfig,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'proj-heart-disease',
          appId: '1:183846828374:web:6d722aaccfd10a0f91bef7',
          databaseURL:
            'https://proj-heart-disease-default-rtdb.asia-southeast1.firebasedatabase.app',
          storageBucket: 'proj-heart-disease.appspot.com',
          apiKey: 'AIzaSyB6e2gNKUHkhlZibA2sLLaLFGVJ3q1_YqI',
          authDomain: 'proj-heart-disease.firebaseapp.com',
          messagingSenderId: '183846828374',
          measurementId: 'G-1217WZBBM9',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideMessaging(() => getMessaging())),

    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'proj-heart-disease',
        appId: '1:183846828374:web:6d722aaccfd10a0f91bef7',
        databaseURL:
          'https://proj-heart-disease-default-rtdb.asia-southeast1.firebasedatabase.app',
        storageBucket: 'proj-heart-disease.appspot.com',
        apiKey: 'AIzaSyB6e2gNKUHkhlZibA2sLLaLFGVJ3q1_YqI',
        authDomain: 'proj-heart-disease.firebaseapp.com',
        messagingSenderId: '183846828374',
        measurementId: 'G-1217WZBBM9',
      },
    },
  ],
};

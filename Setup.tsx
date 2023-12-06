import React from 'react';

import firebase from '@react-native-firebase/app';
import App from './App';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || 'not found',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'not found',
  projectId: process.env.REACT_APP_PROJECT_ID || 'not found',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'not found',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || 'not found',
  appId: process.env.REACT_APP_APP_ID || 'not found',
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || 'not found',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (__DEV__) {
  firebase.functions().useEmulator('localhost', 5001);
}

function Setup() {
  return <App />;
}

export default Setup;

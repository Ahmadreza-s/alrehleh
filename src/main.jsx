import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import App from './App.jsx';
import './styles/global.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB25VozHzaPT_YXazs9NGOne3MJJU2Wywg',
  authDomain: 'alrehleh-ef645.firebaseapp.com',
  projectId: 'alrehleh-ef645',
  storageBucket: 'alrehleh-ef645.firebasestorage.app',
  messagingSenderId: '401613730888',
  appId: '1:401613730888:web:e4d670d0eb5eafb6ccd47d',
  measurementId: 'G-B7QRJC2R6T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

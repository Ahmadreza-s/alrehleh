import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
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

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;


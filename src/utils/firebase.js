import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Save booking data to Firestore
 * @param {Object} bookingData - The booking data to save
 * @returns {Promise<string>} Document ID of the saved booking
 */
export const saveBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: serverTimestamp(),
    });

    console.log('Booking saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

/**
 * Save newsletter subscription to Firestore
 * @param {string} email - The email address to subscribe
 * @returns {Promise<string>} Document ID of the saved subscription
 */
export const saveNewsletterSubscription = async (email) => {
  try {
    const docRef = await addDoc(collection(db, 'newsletter'), {
      email: email,
      subscribed: true,
      createdAt: serverTimestamp(),
    });

    console.log('Newsletter subscription saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    throw error;
  }
};

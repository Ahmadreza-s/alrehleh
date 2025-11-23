import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

/**
 * Log a custom event to Firebase Analytics
 * @param {string} eventName - Name of the event (should be uppercase with underscores)
 * @param {Object} eventParams - Optional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
      console.log('Analytics Event:', eventName, eventParams);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Event names constants
export const ANALYTICS_EVENTS = {
  CLICK_WHATSAPP_HEADER: 'CLICK_WHATSAPP_HEADER',
  CLICK_FACEBOOK_HEADER: 'CLICK_FACEBOOK_HEADER',
  CLICK_INSTAGRAM_HEADER: 'CLICK_INSTAGRAM_HEADER',
  CLICK_YOUTUBE_HEADER: 'CLICK_YOUTUBE_HEADER',
  CLICK_CITY_CHANGE: 'CLICK_CITY_CHANGE',
  CLICK_SPECIALITY_CHANGE: 'CLICK_SPECIALITY_CHANGE',
  CLICK_WHATSAPP_HOSPITAL_CARD: 'CLICK_WHATSAPP_HOSPITAL_CARD',
  CLICK_OTHER_TIME: 'CLICK_OTHER_TIME',
  CLICK_CONTINUE_NEAREST_TIME: 'CLICK_CONTINUE_NEAREST_TIME',
  CLICK_CONTINUE_CHOOSE_LATER: 'CLICK_CONTINUE_CHOOSE_LATER',
  CLICK_SUBMIT_BOOKING: 'CLICK_SUBMIT_BOOKING',
  CLICK_CLOSE_MAP_BANNER: 'CLICK_CLOSE_MAP_BANNER',
  VIEW_BOOKING_PAGE: 'VIEW_BOOKING_PAGE',
  VIEW_HOME_PAGE: 'VIEW_HOME_PAGE',
};


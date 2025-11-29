import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import logoWhite from '@/assets/images/icons/logo-white.png';
import { LoadingContainer, LogoImage, LoadingText } from './styles';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'العلاج في إيران صار أسهل';

  useEffect(() => {
    // Typewriter animation
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // هر کاراکتر 100ms

    // Close loading after 6 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <LoadingContainer
          as={motion.div}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <LogoImage
              as={motion.img}
              src={logoWhite}
              alt="Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.2,
              }}
            />
            <LoadingText>
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                |
              </motion.span>
            </LoadingText>
          </Box>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
};

export default Loading;


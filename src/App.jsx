import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Container from '@mui/material/Container';
import HeaderInfo from '@/components/HeaderInfo';
import MainHeader from '@/components/MainHeader';
import Loading from '@/components/Loading';
import Home from '@/pages/Home';
import Booking from '@/pages/Booking';

// Component wrapper برای انیمیشن صفحات
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Loading />
      <HeaderInfo />
      <MainHeader />
      <Container>
        <AnimatedRoutes />
      </Container>
    </BrowserRouter>
  );
}

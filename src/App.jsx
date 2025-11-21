import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';
import HeaderInfo from '@/components/HeaderInfo';
import MainHeader from '@/components/MainHeader';
import Home from '@/pages/Home.jsx';
import About from '@/pages/About.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <HeaderInfo />
      <MainHeader />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

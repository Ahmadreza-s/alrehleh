import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '@/components/NavBar.jsx';
import Home from '@/pages/Home.jsx';
import About from '@/pages/About.jsx';

export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Container sx={{ py: 4 }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}



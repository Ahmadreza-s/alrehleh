import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function NavBar() {
	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					alrehleh
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button
						color={isActive('/') ? 'secondary' : 'inherit'}
						component={RouterLink}
						to="/"
					>
						Home
					</Button>
					<Button
						color={isActive('/about') ? 'secondary' : 'inherit'}
						component={RouterLink}
						to="/about"
					>
						About
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}



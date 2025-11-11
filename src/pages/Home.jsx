import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
	return (
		<Stack spacing={2}>
			<Typography variant="h4" component="h1">
				Welcome to alrehleh
			</Typography>
			<Typography variant="body1">
				This is a sample Home page using React 19, Vite, and MUI.
			</Typography>
			<Button variant="contained" component={RouterLink} to="/about">
				Go to About
			</Button>
		</Stack>
	);
}



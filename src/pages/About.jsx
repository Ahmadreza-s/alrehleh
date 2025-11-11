import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function About() {
	return (
		<Stack spacing={2}>
			<Typography variant="h4" component="h1">
				About
			</Typography>
			<Typography variant="body1">
				This is a sample About page. Edit it in src/pages/About.jsx.
			</Typography>
			<Button variant="outlined" component={RouterLink} to="/">
				Back Home
			</Button>
		</Stack>
	);
}



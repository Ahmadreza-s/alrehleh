import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import useStyles from './styles.js';

const Comment = ({ profileImage, userName, userLocation, rating = 5, commentText }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.card}>
      <Box className={classes.content}>
        <Box className={classes.leftSection}>
          <Box className={classes.starsContainer}>
            {Array.from({ length: rating }).map((_, index) => (
              <StarRoundedIcon key={index} className={classes.starIcon} />
            ))}
          </Box>
          <Typography variant="body1" className={classes.commentText}>
            {commentText}
          </Typography>
        </Box>
        <Box className={classes.rightSection}>
          <Avatar src={profileImage} alt={userName} className={classes.avatar} />
          <Typography variant="subtitle1" className={classes.userName}>
            {userName}
          </Typography>
          <Typography variant="body2" className={classes.userLocation}>
            {userLocation}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;

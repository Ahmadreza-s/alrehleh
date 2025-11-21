import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { Comments } from '@/constants/comments';
import Comment from '@/components/Comment';
import { useStyles } from './styles.js';

const CommentSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHovered, setIsHovered] = useState(false);
  const classes = useStyles({ isHovered });

  // Duplicate comments only if animation is active (desktop view)
  const commentsToRender = isMobile ? Comments : [...Comments, ...Comments];

  return (
    <Box className={classes.commentSection}>
      <Typography variant="h5" className={classes.commentSectionTitle}>
        آراء عملائنا
      </Typography>
      <Box className={classes.commentsWrapper}>
        <Box
          className={classes.commentsContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {commentsToRender.map((comment, index) => (
            <Comment
              key={`comment-${index}`}
              profileImage={comment.profileImage}
              userName={comment.userName}
              userLocation={comment.userLocation}
              rating={comment.rating}
              commentText={comment.commentText}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;

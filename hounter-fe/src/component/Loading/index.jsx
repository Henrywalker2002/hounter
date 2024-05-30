import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '60vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <CircularProgress color="primary" sx={{ marginBottom: 2 }} />
      <Typography variant="body1" color="textSecondary">
        Loading...
      </Typography>
    </Grid>
  );
};

export default Loading;

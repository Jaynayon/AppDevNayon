import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "@fontsource/mulish";

export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        fontFamily: "Mulish",
        paddingLeft: "20px",
        paddingTop: "15px",
      }}
    >
      <TextField  fullWidth label="University Name" id="Name" size="small"/>
    </Box>
  );
}
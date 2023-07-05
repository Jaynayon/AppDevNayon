import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackbarProps = {
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  open:boolean,
  code:number,
  successMessage:string,
  errorMessage:string
}

export default function CustomizedSnackbars(props:SnackbarProps) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  const condition = (prop:number) =>{
    if(prop == 1) return (
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {props.errorMessage}
      </Alert>
    );
    else return(
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props.successMessage}
      </Alert>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
      {condition(props.code)}
      </Snackbar>
    </Stack>
  );


 
  
}

/*<Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>*/
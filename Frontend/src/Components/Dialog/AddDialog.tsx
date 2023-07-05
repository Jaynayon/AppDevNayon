import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext, useEffect } from 'react';
import { RestContext } from '../Helpers/RestContext';
import { AddContext } from '../Helpers/AddContext';
import axios from 'axios';

type AddDialogProps = {
    name: string,
    details:string,
    image:React.SetStateAction<undefined>
}

export default function AddDialog(prop:AddDialogProps) {
  const rest = useContext(RestContext)
  const addCon = useContext(AddContext);
  const [open, setOpen] = React.useState(true);
  const [render,setRenderer] = React.useState(false);

  useEffect(()=>{
    if(rest?.id == undefined)
      setRenderer(!render);
  },[rest?.id])

  const handleClose = () => {
    setOpen(false);
    addCon?.setOpenDialog(false)
  };

  const handleCloseAgree = () => {
    rest?.postUniversity({name: prop.name, details: prop.details, image: prop.image});
    //console.log(rest?.id);
    
    setOpen(false);
    addCon?.setOpenDialog(false)
    addCon?.setRenderer(!addCon?.renderer)
    rest?.setRenderer(!rest?.renderer);
  };

  const handleCloseDisagree = () => {
    setOpen(false);
    addCon?.setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{fontFamily:"Mulish", fontWeight:"bold"}}>
          {"Are you sure you want to add a new record with the following info:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontFamily:"Mulish"}}>
            <span>University Name: </span>
            <span style={{color:"green"}}>{prop.name}</span><br/>
            <span>University Details: </span>
            <span style={{color:"green"}}>{prop.details}</span><br/><br/>
            <span>This record will be </span>
            <span style={{color:"green"}}>POSTED</span>
            <span> in the database immediately.</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree} sx={{
            fontFamily:"Mulish",
            }}>Cancel</Button>
          <Button onClick={handleCloseAgree} sx={{fontFamily:"Mulish", paddingRight:"20px"}} autoFocus> 
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
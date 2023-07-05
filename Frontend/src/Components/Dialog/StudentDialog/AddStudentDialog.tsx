import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { RestContext } from '../../Helpers/RestContext';
import { AddContext } from '../../Helpers/AddContext';
import { RestStudentContext } from '../../Helpers/RestStudentContext';

type AddDialogProps = {
    fname:string,
    mname:string,
    lname:string,
    email:string,
    cn:string,
    uid:string,
}

export default function AddStudentDialog(prop:AddDialogProps) {
  const rest = useContext(RestStudentContext)
  const addCon = useContext(AddContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    addCon?.setOpenDialog(false)
  };

  const handleCloseAgree = () => {
    rest?.postStudent(
      {id:"",fname:prop.fname,mname:prop.mname,lname:prop.lname,email:prop.email,
      cn:prop.cn,uid:prop.uid}
      )
    setOpen(false);
    addCon?.setOpenDialog(false)
    addCon?.setRenderer(!addCon?.renderer)
    rest?.setRenderer(!rest?.renderer)
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
            <span>First Name: </span>
            <span style={{color:"green"}}>{prop.fname}</span><br/>
            <span>Middle Name: </span>
            <span style={{color:"green"}}>{prop.mname}</span><br/>
            <span>Last Name: </span>
            <span style={{color:"green"}}>{prop.lname}</span><br/>
            <span>Contact Number: </span>
            <span style={{color:"green"}}>{prop.cn}</span><br/>
            <span>Email: </span>
            <span style={{color:"green"}}>{prop.email}</span><br/>
            <span>University Id: </span>
            <span style={{color:"green"}}>{prop.uid}</span><br/><br/>
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
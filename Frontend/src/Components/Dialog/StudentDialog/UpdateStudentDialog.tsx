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
import { UpdateContext } from '../../Helpers/UpdateContext';
import { RestStudentContext } from '../../Helpers/RestStudentContext';

type UpdateDialogProps = {
    id:string,
    fname: string,
    mname: string,
    lname: string,
    email: string,
    cn: string
}

export default function UpdateDialog(prop:UpdateDialogProps) {
  const rest = useContext(RestStudentContext)
  const updateCon = useContext(UpdateContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    updateCon?.setOpenDialog(false)
  };

  const handleCloseAgree = () => {
    rest?.putStudent(
      {id:prop.id,fname:prop.fname,mname:prop.mname,lname:prop.lname,
      email:prop.email,cn:prop.cn,uid:""})
    setOpen(false);
    updateCon?.setOpenDialog(false)
    updateCon?.setRenderer(!updateCon?.renderer)
    rest?.setRenderer(!rest?.renderer)
  };

  const handleCloseDisagree = () => {
    setOpen(false);
    updateCon?.setOpenDialog(false);
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
          {"Are you sure you want to update university id "+prop.id+" with the following info:"}
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
            <span>This record will be </span>
            <span style={{color:"#F6BE00"}}>UPDATED</span>
            <span> in the database immediately.</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree} sx={{
            fontFamily:"Mulish",
            }}>Cancel</Button>
          <Button onClick={handleCloseAgree} sx={{fontFamily:"Mulish", paddingRight:"20px"}} autoFocus> 
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
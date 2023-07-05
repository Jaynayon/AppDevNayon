import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { RestContext } from '../Helpers/RestContext';
import { AddContext } from '../Helpers/AddContext';
import { UpdateContext } from '../Helpers/UpdateContext';

type UpdateDialogProps = {
    id:string,
    name: string,
    details:string
}

export default function UpdateDialog(prop:UpdateDialogProps) {
  const rest = useContext(RestContext)
  const updateCon = useContext(UpdateContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    updateCon?.setOpenDialog(false)
  };

  const handleCloseAgree = () => {
    rest?.putUniversity({id:prop.id,name:prop.name,details:prop.details,dateAdded:"",lastUpdated:"",hours:""})
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
            <span>University Name: </span>
            <span style={{color:"green"}}>{prop.name}</span><br/>
            <span>University Details: </span>
            <span style={{color:"green"}}>{prop.details}</span><br/><br/>
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
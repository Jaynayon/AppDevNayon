import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { RestContext } from '../../Helpers/RestContext';
import { DeleteContext } from '../../Helpers/DeleteContext';
import { RestStudentContext } from '../../Helpers/RestStudentContext';

type AlertDialogProps = {
    id: string
}

export default function DeleteStudentDialog(prop:AlertDialogProps) {
  const rest = useContext(RestStudentContext)
  const deleteCon = useContext(DeleteContext);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    deleteCon?.setOpenDialog(false)
  };

  const handleCloseAgree = () => {
    rest?.deleteStudent(prop.id) 
    setOpen(false);
    deleteCon?.setOpenDialog(false)
    deleteCon?.setRenderer(!deleteCon?.renderer)
    rest?.setRenderer(!rest?.renderer)
  };

  const handleCloseDisagree = () => {
    setOpen(false);
    deleteCon?.setOpenDialog(false);
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
          {"Are you sure you want to delete university id "+prop.id+"?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontFamily:"Mulish"}}>
            <span>This record will be </span>
            <span style={{color:"red"}}>deleted</span>
            <span> from the database immediately. You can't undo this action.</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree} sx={{
            fontFamily:"Mulish",
            }}>Cancel</Button>
          <Button onClick={handleCloseAgree} sx={{fontFamily:"Mulish", paddingRight:"20px"}} autoFocus> 
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
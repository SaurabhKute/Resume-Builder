 import { Dialog, DialogActions, Button, Typography, TextField, Box } from '@mui/material';
import { useState } from 'react';

interface ConfirmationModalProps {
  open: boolean;
  onClose():void;
  onConfirm():void;
  title:string;
  message:string;
  editText?:string;
  buttonText1:string;
  buttonText2:string;
  buttonColor2:string;
}


const ConfirmationModal = ({ open, onClose, onConfirm, title, message, editText,buttonText1,buttonText2,buttonColor2 }:ConfirmationModalProps) => {

  console.log(buttonColor2, "btn2color");
  const [editName, setEditName] = useState(editText || '');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      maxWidth="sm" // Set the maximum width
      // fullWidth // Set the dialog to full width
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '240px', // Minimum height
          minWidth: '600px', // Minimum width
          maxHeight: '70vh', // Maximum height
          maxWidth: '80vw', // Maximum width
          borderRadius: '12px',
          boxSizing: 'border-box'
        },
      }}
    >
      {/* <DialogTitle id="confirmation-dialog-title" sx={{marginLeft:'14px',marginTop:'10px', fontSize:'20px'}}>{title} </DialogTitle> */}
      <Typography sx={{ marginLeft: '40px', marginTop: '40px', fontSize: '20px' }}>{title}</Typography>
      <Typography sx={{ marginLeft: '40px', marginTop: '4px', fontSize: '15px', fontWeight: 'light' }}>{message}</Typography>
      {editText && (
        <Box
          sx={{
            width: 450,
            maxWidth: '100%',
            m: 2,
            marginLeft: '40px',
            marginTop:'10px'

          }}
        >
          <TextField fullWidth value={editName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditName(event.target.value);
            }}
          />
        </Box>
      )}

      <DialogActions sx={{margin:'20px' , marginTop:'40px'}}>
        <Button onClick={onClose} color='inherit' variant="outlined" sx={{ fontSize: '12px', }}>
        {buttonText1}
        </Button>
        <Button onClick={onConfirm}
        
        color={buttonColor2 == 'success' ? 'success': 'error'}
        variant="contained" sx={{ fontSize: '12px', margin: '10px', }}>
          {buttonText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

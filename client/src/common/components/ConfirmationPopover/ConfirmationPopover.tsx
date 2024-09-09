import { Dialog, DialogActions, Button, Typography, TextField, Box } from '@mui/material';
import { useState, useEffect } from 'react';

interface ConfirmationModalProps {
  open: boolean;
  onClose(): void;
  onConfirm(editText: string): void;
  title: string;
  message: string;
  editText?: string;
  buttonText1: string;
  buttonText2: string;
  buttonColor2: string;
  onEditTextChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  editText,
  buttonText1,
  buttonText2,
  buttonColor2,
  onEditTextChange,
}: ConfirmationModalProps) => {
  const [editName, setEditName] = useState<string>('');

  // Update the state when editText or open changes
  useEffect(() => {
    if (open && editText !== undefined) {
      setEditName(editText);
    }
  }, [open, editText]);

  const handleConfirm = () => {
    onConfirm(editName); // Pass the current value of editName
  };

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
          boxSizing: 'border-box',
        },
      }}
    >
      <Typography sx={{ marginLeft: '40px', marginTop: '40px', fontSize: '20px' }}>
        {title}
      </Typography>
      <Typography sx={{ marginLeft: '40px', marginTop: '4px', fontSize: '15px', fontWeight: 'light' }}>
        {message}
      </Typography>
      {editText !== undefined && (
        <Box
          sx={{
            width: 450,
            maxWidth: '100%',
            m: 2,
            marginLeft: '40px',
            marginTop: '10px',
          }}
        >
          <TextField
            fullWidth
            value={editName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditName(event.target.value);
              if (onEditTextChange) {
                onEditTextChange(event);
              }
            }}
          />
        </Box>
      )}
      <DialogActions sx={{ margin: '20px', marginTop: '40px' }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{ fontSize: '12px' }}
        >
          {buttonText1}
        </Button>
        <Button
          onClick={handleConfirm}
          color={buttonColor2 === 'success' ? 'success' : 'error'}
          variant="contained"
          sx={{ fontSize: '12px', margin: '10px' }}
         
        >
          {buttonText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

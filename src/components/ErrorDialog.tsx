import React from 'react';
import './DateSchedular.css';
import {
   Box, Button, Dialog,
    DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

interface OwnProps {
    open: any;
    closeModal?: () => void;
  }

type Props = OwnProps;

const ErrorDialog: React.FC<Props> = ({
    open, 
    closeModal,
  }) => {
    console.log('error dialog : ');
    
    return (
        <>
            <Box maxWidth="md" className="main-wrapper">
            </Box>
            <Dialog open={open} fullWidth maxWidth="sm">
                <DialogTitle id="form-dialog-title">Error</DialogTitle>
                <DialogContent>
                   This time slot is already allocated. Please select other slot.
                </DialogContent>
                <DialogActions>
                    <Button size="small" color="primary" onClick={closeModal} className="confirm-btn">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ErrorDialog;

import React from 'react';
import moment from 'moment';
import './DateSchedular.css';
import {
    Box, Button, Dialog,
    DialogActions, DialogContent, DialogTitle, Grid, Icon
} from '@material-ui/core';

interface OwnProps {
    date: string;
    time: number;
    reason: string;
    open: any;
    closeModal?: () => void;
}

type Props = OwnProps;

const ConfirmDialog: React.FC<Props> = ({
    date,
    time,
    reason,
    open,
    closeModal,
}) => {    
    return (
        <>
            <Dialog open={open} fullWidth maxWidth="sm" className="dialog-container">
                <DialogTitle className="form-dialog-title">Confirmed</DialogTitle>
                <DialogContent style={{padding: '0 24px'}}>
                    <h5 style={{color: 'rgba(3, 2, 2, 0.66)', fontSize: 19, margin: '0 0 20px', fontWeight: 500}}>Your appointment with your mentor is booked.</h5>
                    <Box>
                        <Grid item xs={12} md={12} style={{ padding: '10px 0' }}>
                            <Icon className="dialog-date dialog-icon">event</Icon>
                            <div style={{ display: 'inline' }}>
                                <p style={{ display: 'inline' }} className="dialog-date">{moment(date).format('MMMM Do YYYY')}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ padding: '10px 0', color: 'rgba(3, 2, 2, 0.66)' }}>
                            <Icon className="dialog-icon">schedule</Icon>
                            <div style={{ display: 'inline' }}>
                                <p style={{ display: 'inline', fontSize: '20px' }}>
                                    {(time > 12)
                                    ? ((time-12) + 'pm')
                                    : (time + 'am')}
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ padding: '10px 0', color: 'rgba(3, 2, 2, 0.66)' }}>
                            <Icon className="dialog-icon">event_note</Icon>
                            <div style={{ display: 'inline' }}>
                                <label className="dialog-content-label">Reason:</label>
                                <p style={{ display: 'inline', fontSize: '20px', margin: '0 13px' }}>{reason}</p>
                            </div>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions style={{padding: '0 24px 24px'}}>
                    <Button size="small" color="primary" onClick={closeModal} className="confirm-btn">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;

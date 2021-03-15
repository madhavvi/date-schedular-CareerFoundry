import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import { RootState } from 'redux/rootReducer';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import './DateSchedular.css';
import {
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    CssBaseline, Box, Paper, Button
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { getSlotsRequest } from '../actions/slots';
import { getSlots } from '../api/slots';
import { selectSlotViewList, selectSlotViewState } from '../selector/slotViewSelector';
import { slotData } from '../Data';
import { groupBy } from 'lodash';
import ConfirmDialog from './ConfirmDialog';
import ErrorDialog from './ErrorDialog';

const theme = createMuiTheme({
    typography: {
        htmlFontSize: 15,
    },
    palette: {
        primary: {
            main: '#00A2FF',
            light: '#FFFFFF'
        },
    },
});

// interface StateFromProps {
//     slots: typeof selectSlotViewList;
// }

// interface DispatchFromProps {
//     getSlotsRequest: typeof getSlotsRequest;
// }

// interface OwnProps { slots: any }

// type Props =
//     StateFromProps &
//     DispatchFromProps &
//     OwnProps;

const DateSchedular = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const maxDate = moment().add(5, 'months'); //max date set to 5 months from today
    const [showTimeField, setShowTimeField] = useState(false);
    const [selectedTime, setSelectedTime] = useState();
    const [reason, setReason] = useState();
    const [showReasonField, setShowReasonField] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    let allottedSlotsDate = slotData[0].calendar;
    const [groupedData, setGroupedData] = useState();
    let allottedSlotsTime = [];
    const [selectOptions, setSelectOptions] = useState([]);
    let initialSelectOptions = [];
    for (var i = 0; i < 24; i++) {
        initialSelectOptions.push((i + 1).toLocaleString());
    }
    initialSelectOptions = initialSelectOptions.map((o) => ({
        label: o.length < 2 ? '0'+o : o,
        value: o,
        allotted: false
    }));
    // setSelectOptions(initialSelectOptions);

    // useEffect(() => {
    // }, [initialSelectOptions]);

    useEffect(() => {
        allottedSlotsDate = allottedSlotsDate.map((date) => {
            return moment(date.date_time).format('YYYY-MM-DD HH:mm:ss');
        })
        setGroupedData(groupBy(allottedSlotsDate, function (date) {
            return moment(date).format('YYYY-MM-DD')
        }));

    }, [slotData, allottedSlotsDate])

    const closeModal = () => {
        setOpen(!open);
        setSelectedDate(moment());
        setSelectedTime(undefined);
        setReason(undefined);
        setShowTimeField(false);
        setShowReasonField(false);
        setSubmitDisabled(true);
    };

    const closeErrorModal = () => {
        setOpenErrorDialog(!openErrorDialog);
    }

    const handleDateChange = (date) => {
        const currentDate = groupedData && groupedData[moment(date).format('YYYY-MM-DD')];
        currentDate && currentDate.forEach(date => {
            allottedSlotsTime.push(moment(date).format('HH:mm:ss'))
        });
        if (allottedSlotsTime.length) {
            initialSelectOptions = (initialSelectOptions.filter((v) => {
               return allottedSlotsTime.map(o => {
                    return v.allotted = true && o.includes(v.value); // partialy wrong logic to search allotted time.
                })
            }))
            setSelectOptions(initialSelectOptions);
        }

        setSelectedDate(date);
        setShowTimeField(true);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time.target.value);
        setShowReasonField(true);
    };

    const onTimeChange = (event) => {
        setShowReasonField(false);
        setOpenErrorDialog(true);
    }

    const handleReasonChange = (e) => {
        setSubmitDisabled(e.target.value ? false : true);
        setReason(e.target.value);
    }

    const confirmSlot = () => {
        setOpen(true);
    }

    const disableWeekends = (date) => {
        return moment(date).weekday() === 0 || moment(date).weekday() === 6;
    }

    return (
        <>
            <Box maxWidth="md" className="main-wrapper">
                <main className="ulp-outer main-container">
                    <Grid container item xs={12} md={12} direction="row" className="grid-container">
                        <p className="slot-label">Schedule a call with your mentor</p>
                        <Grid container item xs={12} md={12} direction="row">
                            <Grid item xs={6} md={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <Grid item>
                                        <Paper style={{ overflow: "hidden", maxWidth: '400px', margin: 'auto' }}>
                                            <ThemeProvider theme={theme}>
                                                <Calendar
                                                    date={selectedDate}
                                                    onChange={handleDateChange}
                                                    disablePast
                                                    maxDate={maxDate}
                                                    shouldDisableDate={disableWeekends} //to disable weekendds
                                                />
                                            </ThemeProvider>
                                        </Paper>
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6} md={6} className="input-container">
                                <Grid item xs={12} md={12} className="input-fields">
                                    {showTimeField && (
                                        <FormControl fullWidth>
                                            <InputLabel>{'Select time'}</InputLabel>
                                            <Select
                                                multiple={false}
                                                disabled={false}
                                                value={selectedTime || ''}
                                                onChange={handleTimeChange}
                                                style={{textAlign: 'left'}}
                                            >
                                                {selectOptions.map((v) => (
                                                    <MenuItem key={v.value} value={v.value} label={v.label}>
                                                        {v.allotted ? (
                                                            <span className="disbled-option" onClick={onTimeChange}>
                                                                {(v.label > 12) ? (v.label +':00 PM') : (v.label +':00 AM')} 
                                                            </span>
                                                        ) 
                                                        : (
                                                            <span>
                                                                {(v.label > 12) ? (v.label +':00 PM') : (v.label +':00 AM')} 
                                                            </span>
                                                        )
                                                    }
                                                        {/* disabled={v.allotted} */}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={12} className="input-fields">
                                    {(showTimeField && showReasonField) && (
                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                value={reason || ''}
                                                label="Reason"
                                                onChange={handleReasonChange}
                                            />
                                        </FormControl>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container style={{ paddingTop: 10 }} justify="flex-end">
                                        <Button
                                            size="large"
                                            color="primary"
                                            type="submit"
                                            className="confirm-btn"
                                            onClick={confirmSlot}
                                            disabled={submitDisabled}
                                        >
                                            {'Confirm'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CssBaseline />
                </main>
            </Box>
            {open && (
                <ConfirmDialog open date={selectedDate} time={parseInt(selectedTime)} reason={reason} closeModal={closeModal} />
            )}
            {openErrorDialog && (
                <ErrorDialog open closeModal={closeErrorModal} />
            )}
        </>
    )
}

// function mapStateToProps(state: any): StateFromProps {
//     return {
//         slots: selectSlotViewList(state),
//     };
// }

// function mapDispatchToProps(dispatch: any): DispatchFromProps {
//     return {
//         getSlotsRequest: dispatch(getSlotsRequest)
//     }
// };

// export default connect<StateFromProps, DispatchFromProps, OwnProps>(
//     mapStateToProps,
//     mapDispatchToProps,
// )(DateSchedular);

export default DateSchedular;

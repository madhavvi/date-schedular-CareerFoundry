export const Types = {
    GET_SLOTS_REQUEST: 'slots/get_slots_request',
    GET_SLOTS_SUCCESS: 'slots/get_slots_success',
    SLOT_ERROR: 'slots/slot_error'
}

export const getSlotsRequest = () => ({
    type: Types.GET_SLOTS_REQUEST
})

export const getSlotsSuccess = ({items}) => ({
    type: Types.GET_SLOTS_SUCCESS,
    payload: {
        items
    }
})

export const slotError = ({error}) => ({
    type: Types.SLOT_ERROR,
    payload: {
        error
    }
});
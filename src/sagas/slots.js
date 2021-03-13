import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/slots';
import * as api from '../api/slots';

function* getSlots() {
    // console.log('getSlots.....');
    try {
        const result = yield call(api.getSlots);
        yield put(actions.getSlotsSuccess({
			items: result.calender
		}));
        console.log('result : ', result);
    } catch (e) {
        yield put(actions.slotError({
            error: 'An error occurred when trying to get the slots'
        }));
    }
}

function* watchGetSlotsRequest() {
    yield takeEvery(actions.Types.GET_SLOTS_REQUEST, getSlots);
}

const slotsSagas = [
    fork(watchGetSlotsRequest)
]

export default slotsSagas;
import SlotsSaga from './slots';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...SlotsSaga
    ])
}
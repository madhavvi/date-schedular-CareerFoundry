import { combineReducers } from 'redux';
import SlotsReducer from './slots';

export default combineReducers({
    slots: SlotsReducer
})
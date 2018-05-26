//@flow

import Redux from 'redux';
import applicationControl from './reducers/applicationControl.mjs';

const rootReducer = Redux.combineReducers({
    applicationControl,
})

export default rootReducer
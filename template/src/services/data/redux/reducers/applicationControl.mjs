//@flow

import StateTypes from "../enums/stateTypes.mjs";
import ACTIONS from "../enums/actionTypes.mjs";
import Action from "../actions/Action.mjs";

const applicationControlReducer = (state:* = {}, action:$Subtype<Action>) => {
    switch (action.type) {
        case ACTIONS.ON:
            return Object.assign({},state, { status: StateTypes.ACTIVATING});
        default:
            return state;
    }
};


export default applicationControlReducer;
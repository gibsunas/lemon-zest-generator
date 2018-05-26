//@flow
import Action from './Action.mjs';
import BaseAction from './BaseAction.mjs';

class AsyncAction extends BaseAction {
    constructor(payload: Promise<*> | (dispatch:*) => Promise<*>, errorAction:*) {
        super();

        if(payload instanceof Promise) {
            return (dispatch: *) => payload
                .then((x:typeof Action)=>dispatch(x))
                .catch(err => dispatch(errorAction));
        } else {
            return payload;
        }


    }
}

export default AsyncAction;
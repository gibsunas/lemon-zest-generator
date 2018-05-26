//@flow
import BaseAction from "./BaseAction.mjs";

class Action extends BaseAction {
    type:string;
    payload:*;
    toJSON:*;
    constructor(type:string, payload: *) {
        super();
        this.type = type;
        this.payload = payload;
        return {type,payload};
    }
}

export default Action;
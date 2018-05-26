//@flow
import Redux from 'redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import BaseProvider from './baseProvider.mjs';
import PROVIDERS from "./providerEnum.mjs";
import rootReducer from '../redux/rootReducer.mjs';
import defaultState from '../redux/defaultState.mjs';

const {createStore, applyMiddleware} = Redux;
const actionFormatter = (action,time,took) => `=> [${action.type}] (in ${took.toFixed(2)} ms)`;

class ReduxProvider extends BaseProvider {
    key:typeof PROVIDERS.REDUX;
    service: *;
    _reduxStore: *;

    constructor() {
        super();
        this.key = PROVIDERS.REDUX;
        const middleware: Array<*> = [
            reduxLogger.createLogger({
                titleFormatter: actionFormatter,
                colors: {
                    title: false,
                    prevState: false,
                    action: false,
                    nextState: false,
                    error: false,
                }
            }),
            thunk.default,

        ];

        this._reduxStore = createStore(
            rootReducer,
            defaultState,
            applyMiddleware(...middleware),
        );

        this.service = this._reduxStore;
    }
}

export default ReduxProvider;
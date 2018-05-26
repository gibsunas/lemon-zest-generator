// @flow
import AppServer from './server.mjs';
import DataProvider from './services/data/dataProvider.mjs';
import PROVIDERS from "./services/data/providers/providerEnum.mjs";

const start = () => {
    DataProvider.init().then(dataProvider => {
        new AppServer(dataProvider);

        const io = dataProvider.get(PROVIDERS.SOCKETIO);
        io.on('connection', (dataProvider => (socket) =>{
            const redux = dataProvider.get(PROVIDERS.REDUX);
            const state = redux.getState();

            socket.emit('news', state);

        })(dataProvider));
    });
};

export default { launch: start }
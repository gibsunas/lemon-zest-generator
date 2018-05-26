//@flow
import Influx from 'influxdb-nodejs';

import BaseProvider from './baseProvider.mjs';
import PROVIDERS from "./providerEnum.mjs";
const influxDataTypes = {
    INTEGER: 'i',
    STRING: 's',
    FLOAT: 'f',
    BOOLEAN: 'b',
};

const actionSchema = {
    name: 'action',
    fields: {
        state: influxDataTypes.STRING,
    },
    tags: {
        name: influxDataTypes.STRING,
    },
};

const createSchema = (client:Influx) => (name:string, fieldSchema:*, tagSchema:*) =>
    client.schema(name,fieldSchema,tagSchema, {
        stripUnknown: true,
    });

const createClient = (connectionUrl:string) => {
    const client = new Influx(connectionUrl);

    createSchema(client)(actionSchema.name,actionSchema.fields,actionSchema.tags);

    return client;
};

class InfluxProvider extends BaseProvider {
    key:typeof PROVIDERS.INFLUX;
    service: *;
    _influx:Influx;

    constructor(connectionUrl:string) {
        super();
        this.key = PROVIDERS.INFLUX;
        this._influx = createClient(connectionUrl);
        this.service = this._influx;
    }
}

export default InfluxProvider;
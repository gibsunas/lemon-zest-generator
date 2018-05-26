//@flow
import IoRedis from 'ioredis';
import BaseProvider from './baseProvider.mjs';
import PROVIDERS from "./providerEnum.mjs";

class RedisProvider extends BaseProvider {
    key:typeof PROVIDERS.REDIS;
    service: *;
    _redisClient:?IoRedis;

    constructor() {
        super();
        this.key = PROVIDERS.REDIS
        this.init = () => Promise.resolve(this);

        this.service = this._redisClient;
    }
}

export default RedisProvider;
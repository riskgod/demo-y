import logger from '../util/logger';

const corsOptions = async (): Promise<any> => {
    const whitelist = (
        process.env.CORS_METADATA ||
        'http://localhost:8100'
    ).split(' ');

    return {
        origin: whitelist,
    };
};

export default corsOptions;

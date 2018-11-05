// tslint:disable-next-line
require('dotenv').config();

import { main } from './app';
import auth from './auth/oAuth';
import getCorsOptions from './config/cors';
import logger from './util/logger';

export const NODE_ENV =
    process.env.NODE_ENV !== 'production' ? 'dev' : 'production';

/* istanbul ignore if: main scope */
if (require.main === module) {
    // Default port or given one.
    const PORT = parseInt(process.env.PORT || '3000', 10);

    const isProduction = NODE_ENV === 'production';

    // Don't export GraphiQL (Debug Interface) in prod environments
    const ENABLE_GRAPHQL_PLAYGROUND = !isProduction;

    let authHandler;
    auth()
        .then(handler => {
            authHandler = handler;
            return getCorsOptions();
        })
        .then(corsOptions => {
            main({
                enableGraphqlPlayground: ENABLE_GRAPHQL_PLAYGROUND,
                env: NODE_ENV,
                port: PORT,
                verbose: true,
                enableAuth: true,
                authHandler,
                corsOptions,
            });
        })
        .catch(logger.error);
}

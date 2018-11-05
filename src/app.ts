import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import logger from './util/logger';
import { err as errorRouter, graphqlRoutes } from './routes';

import { sequelize } from './database/models';

interface IMainOptions {
    enableGraphqlPlayground: boolean;
    env: string;
    port: number;
    verbose?: boolean;
    enableAuth: boolean;
    authHandler: jwt.RequestHandler;
    corsOptions: any;
}

export const GRAPHQL_ROUTE = '/graphql';
export const GRAPHIQL_ROUTE = '/server';
export const GRAPHIQL_DEV_ROUTE = '/playground';

export async function main(options: IMainOptions) {
    const { port, env, enableAuth, verbose, authHandler, corsOptions } = options;
    const isProduction = env === 'production';

    const app = express();

    // global middleware
    app.options('*', cors(corsOptions));

    app.use(cors(corsOptions));
    app.use(helmet());

    app.get('/healthcheck', (req, res) => {
        return res.json({ success: true });
    });

    app.use(
        morgan('dev', {
            skip: () => isProduction,
        }),
    );

    if (enableAuth) {
        app.use(
            authHandler.unless({
                path: [
                    GRAPHIQL_DEV_ROUTE,
                    GRAPHIQL_ROUTE,
                    {
                        url: GRAPHQL_ROUTE,
                        methods: ['GET'],
                    },
                ],
            }),
        );
    }

    graphqlRoutes(app, GRAPHQL_ROUTE, GRAPHIQL_DEV_ROUTE);

    // catch-all error handler
    app.use(errorRouter);

    // return Promise to wait until listening + testing
    return app.listen(port, async () => {
        /* istanbul ignore if: no need to test verbose print */
        if (verbose) {
            verbosePrint(options);
        }

        try {
            await sequelize.authenticate();
            sequelize.sync({
                // force: true
            });

            logger.info('Connected to SQL database');
        } catch (e) {
            logger.error('Unable to connect to SQL database', e);
        }
    });
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(options: IMainOptions) {
    logger.info(
        `GraphQL Server is now running on http://localhost:${
        options.port
        }${GRAPHQL_ROUTE}`,
    );
    if (true === options.enableGraphqlPlayground) {
        logger.info(
            `GraphQL Playground is now running on http://localhost:${
            options.port
            }${GRAPHIQL_DEV_ROUTE}`,
        );
    }
}

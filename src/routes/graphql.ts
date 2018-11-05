import { ApolloServer } from 'apollo-server-express';
import { resolver as resolvers, schema } from '../graphql';
import * as models from '../database/models';

import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

export default async (app, GRAPHQL_ROUTE, GRAPHIQL_DEV_ROUTE) => {

    const context = {
        ...models
    };

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        playground: true,
        context: ({ req }) => {
            const dataloaderContext = createContext(models.sequelize);

            return {
                ...context,
                [EXPECTED_OPTIONS_KEY]: dataloaderContext,
                requestingUser: req.user,
            };
        },
    });

    const devServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        playground: true,
        context: ({ req }) => {
            const dataloaderContext = createContext(models.sequelize);

            return {
                ...context,
                [EXPECTED_OPTIONS_KEY]: dataloaderContext,
                requestingUser: {
                    email: req.headers.email,
                },
            };
        },
    });

    server.applyMiddleware({ app, path: GRAPHQL_ROUTE });
    devServer.applyMiddleware({ app, path: GRAPHIQL_DEV_ROUTE });
};

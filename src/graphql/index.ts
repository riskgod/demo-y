import * as glue from 'schemaglue';

const { schema, resolver } = glue('src/graphql/modules', { mode: 'ts' });
export { schema, resolver };

import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

const basename = path.basename(__filename);

const vars = process.env;
const host = vars.DOCKER_POSTGRES || vars.PG_HOST;
const port = vars.PG_PORT;
const dbName = vars.PG_DB_NAME;
const username = vars.PG_USER;
const password = vars.PG_PASS;
const connConfs = [
    dbName,
    username,
    password,
    {
        host,
        port,
        dialect: 'postgres',
        pool: {
            max: 1000,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        operatorAliases: false,
        logging: false,
    },
];

export const sequelize = new Sequelize(...connConfs);
const models: any = {
    sequelize,
};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
        );
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

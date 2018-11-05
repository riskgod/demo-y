import * as util from 'util';
import * as winston from 'winston';

/***
 * NOTE: This is a copy/paste of https://skeletor.etlab.club/new-ventures/logger,
 * and upon it becoming available as an NPM package it should be imported instead
 * of having the code live here.
 */

const { NODE_ENV, development_build } = process.env;

function formatter(options) {
    const time = options.timestamp();
    const level = winston.config.colorize(
        options.level,
        options.level.toUpperCase(),
    );
    let message = options.message;

    if (!message && options.meta && options.meta.stack) {
        // If there isn't a message and the log is passed an Error, add it as the message.
        message = options.meta.stack.toString();
    }

    // Add the meta object on a new line if it exists.
    if (options.meta && Object.keys(options.meta).length) {
        message += `\n${util.inspect(options.meta)}`;
    }

    return `[${time}] [${level}]: ${message}`;
}

let logLevel = 'error';
if (NODE_ENV !== 'production' || development_build) {
    logLevel = 'debug';
}

const consoleTransport = new winston.transports.Console({
    timestamp: () => new Date().toLocaleString(),
    silent: NODE_ENV === 'test',
    level: logLevel,
    formatter,
});

const logger = new winston.Logger({
    transports: [consoleTransport],
    exceptionHandlers: [consoleTransport],
});

export default logger;

import logger from '../util/logger';

const errMiddleware = (err, req, res, next) => {
    logger.error(err.message);
    let message;
    let errCode;
    if (err.name === 'UnauthorizedError') {
        message = 'Check your credentials and try again';
        errCode = 401;
    } else {
        message = 'There was an error processing your request.';
        errCode = 500;
    }
    res.status(errCode).send({ message });
};

export default errMiddleware;

import * as jwt from 'express-jwt';
import * as request from 'got';
import * as lodash from 'lodash';


export default async () => {
    const issuer =
        process.env.OAUTH_ISSUER ||
        '';

    const jwksUri =
        process.env.OAUTH_WELL_KNOWN_JWKS_URI ||
        '';

    const kid = 'MkVFMTQ4RDY1MTYzMEFBQ0M1OTFDODA2QjVBNTM3MDA5MDY3MUY1QQ';
    const pem = await getPubKeyFromJwks(jwksUri, kid); // get pem from idam
    return jwt({
        secret: pem,
        issuer,
        algorithms: ['RS256'],
    });
};

async function getPubKeyFromJwks(
    jwksUri: string,
    kid?: string,
): Promise<string> {
    try {
        const rawKeys = (await request(jwksUri)).body;
        const keys = JSON.parse(rawKeys);
        const sigKey = lodash.find(keys.keys, { kid })
            ? lodash.find(keys.keys, { kid })
            : keys.keys[0];
        return certToPEM(sigKey.x5c[0]);
    } catch (err) {
        throw new Error('Error obtaining PEM cert from jwks endpoint');
    }
}

function certToPEM(cert) {
    cert = cert.match(/.{1,64}/g).join('');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
}

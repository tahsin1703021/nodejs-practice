const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'sfsdsdgdfdgd'
};

environments.production = {
    port: 4000,
    envName: 'production',
    secretKey: 'fhkcbndskgyuvj'
};

//determine which environment was passes

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' 
    ? process.env.NODE_ENV 
    : 'staging';

const environmentToExport = typeof(environments[currentEnvironment]) === 'object'
    ? environments[currentEnvironment]
    : environments[staging];

module.exports = environmentToExport;
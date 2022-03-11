
//dependencies
const { samplehandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler} = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: samplehandler,
    user: userHandler
};

module.exports = routes;
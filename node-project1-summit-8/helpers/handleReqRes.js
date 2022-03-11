//dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');

const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/Not-Found-Handler');
const { parseJSON } = require('../helpers/utilities');

//module scaffolding
const handler = {};

//declare functions
handler.handleReqRes = (req, res) => {
    
    const parsedURL = url.parse(req.url, true);

    const path = parsedURL.pathname;
    const trimmedPathname = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedURL.query;
    const headersObject = req.headers;

    const requestProperties = {
        path,
        trimmedPathname,
        method,
        queryStringObject,
        headersObject
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPathname] ? routes[trimmedPathname] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        requestProperties.body = parseJSON(realData);
        
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : '500';
            payload = typeof(payload) === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            
            res.setHeader('Content-type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

} ;

module.exports = handler;
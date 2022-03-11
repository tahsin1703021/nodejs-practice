

//module scaffolding
const handler = {};

//functions
handler.notFoundHandler = (requestProperties, callback ) => {
    callback(404, {
        message: 'The page cannot be found'
    });
}

module.exports = handler;
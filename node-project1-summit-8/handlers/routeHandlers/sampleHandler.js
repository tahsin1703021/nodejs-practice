
//module scaffolding
const handler = {};

//functions
handler.samplehandler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is the sample handler'
    });
}

module.exports = handler;
//dependencies

const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./environments');
const data = require('./lib/data');

//app object scaffolding

const app = {};

//testing file system
data.create('test', 'newFile', {'name' : 'Bangladesh', 'language' : 'Bangla'}, (err) => {
    console.log('Error was ', err);
}); 

data.read('test', 'newFile',(err, data) => {
    if(!err) console.log(data);
    else console.log(err);
});

data.update('test', 'newFile', {'name' : 'USA', 'language' : 'English'}, (err) => {
    if(err) console.log(err);
});

data.delete('test', 'newfile' , (err) => {
    console.log(err);
});


//create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    })
}

app.handleReqRes = handleReqRes; 

app.createServer();
const fs = require('fs');

const readStream = fs.createReadStream('../../myFile.txt');

readStream.on('data', (chunk)=>{
    console.log(chunk.toString());
})
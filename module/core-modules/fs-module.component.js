const fs = require('fs');

fs.writeFileSync('myFile.txt','Welcome to node js file tutorial');
fs.appendFileSync('myFile.txt','\nHow are you?');

fs.readFile('myFile.txt', ( err,data )=>{
    console.log(data.toString());
})  
console.log('hello');
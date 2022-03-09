const EventEmitter = require('events');//returns a class

//create an object

const emitter = new EventEmitter();

//register a listener for the event
emitter.on('period end event happened', (action) => {
    console.log(`lets go ${action}`);
})

//raise an event
emitter.emit('period end event happened', 'to the cafeteria');


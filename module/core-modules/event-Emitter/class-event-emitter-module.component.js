const EventEmitter = require('events');

class School extends EventEmitter {
    startPeriod(){
        console.log('period has started');
        setTimeout(()=>{
            this.emit('period has ended','to the cafeteria')
        },2000)
    }
}
module.exports = School;
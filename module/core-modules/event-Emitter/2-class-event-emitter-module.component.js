const School = require('./class-event-emitter-module.component');

const school = new School();

school.on('period has ended', (action) => {
    console.log(`lets go ${action}`);
})
school.startPeriod();
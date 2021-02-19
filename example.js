const syslog = require('./syslog');

syslog.init({
    appName: 'syslog-js'
})

setTimeout(() => {
    syslog.log(`Simple log generated on ${new Date().toISOString()}`);
}, 1000);

setTimeout(() => {
    syslog.warn(`Warning log generated on ${new Date().toISOString()}`);
}, 2500);

setTimeout(() => {
    syslog.error(`Error log generated on ${new Date().toISOString()}`);
}, 5000);
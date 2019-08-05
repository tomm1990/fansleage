const consts = require('./consts/constring'),
    mongoose = require('mongoose');

mongoose.connect(consts.MLAB_KEY, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const conn = mongoose.connection;

// Event handlers for Mongoose
conn.on('error', function (err) {
    if (err) console.log(`1. err -> ${err}`);
    console.log('Mongoose: Error: ' + err);
});

conn.on('open', function (err) {
    if (err) {
        console.log(`2. err -> ${err}`);
    }
    console.log('Mongoose: Connection established');
});

conn.on('disconnected', function (err) {
    if (err) console.log(`3. err -> ${err}`);
    console.log('Mongoose: Connection stopped, recconect');
    mongoose.connect(consts.MLAB_KEY, options);
});

conn.on('reconnected', function (err) {
    if (err) console.log(`4. err -> ${err}`);
    console.info('Mongoose reconnected!');
});

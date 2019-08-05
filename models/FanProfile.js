const mongoose = require('mongoose'),
    random = require('mongoose-simple-random'),

    schema = mongoose.Schema,
    fanProfileSchema = new schema({
        name:  String,
        imageUrl:  String
    }, {collection: 'FanProfile'});

fanProfileSchema.plugin(random);

let FanProfileSchema = mongoose.model('FanProfileSchema', fanProfileSchema);

module.exports = FanProfileSchema;
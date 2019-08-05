const mongoose = require('mongoose'),
    random = require('mongoose-simple-random'),

    schema = mongoose.Schema,
    teamProfileSchema = new schema({
        name:  String,
    }, {collection: 'TeamProfile'});

teamProfileSchema.plugin(random);


let TeamProfileSchema = mongoose.model('TeamProfileSchema', teamProfileSchema);

module.exports = TeamProfileSchema;
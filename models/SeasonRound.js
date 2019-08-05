const mongoose = require('mongoose'),
    random = require('mongoose-simple-random'),

    schema = mongoose.Schema,
    seasonRoundSchema = new schema({
        name:  String,
    }, {collection: 'SeasonRound'});

seasonRoundSchema.plugin(random);

let SeasonRoundSchema = mongoose.model('SeasonRoundSchema', seasonRoundSchema);

module.exports = SeasonRoundSchema;
const mongoose = require('mongoose'),
    FanProfile = require('./FanProfile'),
    TeamProfile = require('./TeamProfile'),
    SeasonRound = require('./SeasonRound'),

    schema = mongoose.Schema,
    fanMatchSchema = new schema({
        fan : {type : schema.ObjectId, ref: FanProfile},
        team : {type : schema.ObjectId, ref: TeamProfile},
        round: {type : schema.ObjectId, ref: SeasonRound},
        score:{type : Number, default : 0}

    }, {collection: 'FanMatch'});


let FanMatchSchema = mongoose.model('FanMatchSchema', fanMatchSchema);

module.exports = FanMatchSchema;
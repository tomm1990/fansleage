'use strict';

const
    mongoose = require('mongoose'),
    consts = require('../consts/constring'),
    FanProfile = require('../models/FanProfile'),
    TeamProfile = require('../models/TeamProfile'),
    SeasonRound = require('../models/SeasonRound'),
    FanMatch = require('../models/FanMatch'),
    random = require('mongoose-simple-random');


exports.respondError = (err, res) => {
    console.log(`respondError -> ${ err }`);
    return res.status(506).send(err);
};


exports.getAllFansProfile = (req, res) => {
    console.log('getAllFansProfile() ::');
    FanProfile.find({})
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        });
};


exports.saveNew = (req, res) => {
    console.log("saveNew");
    let newProfile = new FanProfile({
        name: 'name1',
        imageURL: 'img1'
    });

    newProfile.save().then(
        (savedUser) => {
            if (!savedUser) { // Error saving
                console.log(err);
                return res.status(501).send(consts.jsonArr[3]);
            }
            else { // Success
                console.log(consts.jsonArr[4]);
                return res.status(200).send(savedUser);
            }
        }
    ).catch((err, res) => exports.respondError(err, res));

};

exports.saveMultipleNewFanProfile = (req, res) => {
    console.log('saveMultipleNewFanProfile() :');

    function saveMultipleFanProfie(i) {
        if (i == 0)
            return res.sendStatus(200).send('ok');
        let newProfile = new FanProfile({
            name: 'name_' + i,
            imageUrl: 'img_' + i
        });

        newProfile.save().then(
            (savedUser) => {
                if (!savedUser) { // Error saving
                    console.log(err);
                    return res.sendStatus(501).send(consts.jsonArr[3]);
                }
                else { // Success
                    console.log(i - 1);
                    saveMultipleFanProfie(i - 1);
                    //console.log(consts.jsonArr[4]);
                    //return res.status(200).send(savedUser);
                }
            }
        ).catch((err, res) => exports.respondError(err, res));

    }

    saveMultipleFanProfie(200);

};

exports.saveMultipleNewTeam = (req, res) => {
    console.log('saveMultipleNewTeam() :');

    function saveMultipleTeams(i) {
        if (i == 0)
            return res.sendStatus(200).send('ok');

        let newProfile = new TeamProfile({
            name: 'team_name_' + i,
        });

        newProfile.save().then(
            (savedUser) => {
                if (!savedUser) { // Error saving
                    console.log(err);
                    return res.status(501).send(consts.jsonArr[3]);
                }
                else { // Success
                    console.log(i - 1);
                    saveMultipleTeams(i - 1);
                    // console.log(consts.jsonArr[4]);
                    // return res.status(200).send(savedUser);
                }
            }
        ).catch((err, res) => exports.respondError(err, res));

    }

    saveMultipleTeams(4);
};

exports.saveMultipleSeasonRound = (req, res) => {
    console.log('saveMultipleSeasonRound() :');

    function saveMultipleSeasons(i) {
        if (i == 0)
            return res.sendStatus(200).send('ok');

        let newProfile = new SeasonRound({
            name: 'season_name_' + i,
        });

        newProfile.save().then(
            (savedUser) => {
                if (!savedUser) { // Error saving
                    console.log(err);
                    return res.status(501).send(consts.jsonArr[3]);
                }
                else { // Success
                    console.log(i - 1);
                    saveMultipleSeasons(i - 1);
                    // console.log(consts.jsonArr[4]);
                    // return res.status(200).send(savedUser);
                }
            }
        ).catch((err, res) => exports.respondError(err, res));

    }


    saveMultipleSeasons((4 - 1) * 2);

};

exports.saveMultipleFanMatch = (req, res) => {
    console.log('saveMultipleFanMatch() :');

    function insert(score, fanprofileid, teamprofile, seasonid) {
        let newProfile = new FanMatch({
            fan: mongoose.Types.ObjectId(fanprofileid),
            team: mongoose.Types.ObjectId(teamprofile),
            round: mongoose.Types.ObjectId(seasonid),
            score: Math.floor(Math.random() * 101)
        });

        newProfile.save().then(
            (savedUser) => {
                if (!savedUser) { // Error saving
                    console.log(err);
                    return res.status(501).send(consts.jsonArr[3]);
                }
                else { // Success
                    console.log(score - 1);
                    getFanProfileRandomId(score - 1);
                    //console.log(consts.jsonArr[4]);
                    //return res.status(200).send(savedUser);
                }
            }
        ).catch((err, res) => exports.respondError(err, res));

    }

    function getSeasonRoundRandomId(score, fanprofileid, teamprofile) {
        SeasonRound.findOneRandom(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                insert(score, fanprofileid, teamprofile, result._id);
            }
        });
    }

    function getTeamProfileRandomId(score, fanprofileid) {
        TeamProfile.findOneRandom(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                getSeasonRoundRandomId(score, fanprofileid, result._id);
            }
        });
    }

    function getFanProfileRandomId(score) {
        if (score == 0) {
            return res.sendStatus(200).json(score);
        } else {
            FanProfile.findOneRandom(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    getTeamProfileRandomId(score, result._id);
                }
            });
        }
    }

    let total = 200 * 6;

    getFanProfileRandomId(total);
};

exports.getFansByTeamAndRound = (req, res) => {
    console.log(`getFansByTeamAndRound() [team:${req.body.team}][round:${req.body.round}][fan:${req.body.fan}] `);

    const max_fans_in_balcony = 20;
    let total_amount_of_fans, amount_of_balconies, all_fans_matches, current_fan_match, current_index;
    let min_i, not_found = true;

    let f_balcony, f_max_balconies, f_array_fans_20 = [], f_pass_points;

    function collect_and_send() {
        // console.log(f_array_fans_20);
        let json = {
            balcony_no: f_balcony,
            balcony_fans: f_array_fans_20,
            points_to_pass: f_pass_points,
            balcony_amount: f_max_balconies
        };

        return res.status(200).send(json);
    }

    function get_single_point() {
        console.log(`[current_index:${current_index}]`);
        if (current_index - 1 < 0)
            f_pass_points = 0;
        else {
            if (f_balcony == 0) {
                f_pass_points = 0;
            } else {
                f_pass_points = all_fans_matches[min_i - 1].score - current_fan_match.score;
            }

        }

        collect_and_send();
    }

    function populate_fans() {
        for (let i = 0; i < total_amount_of_fans; i++) {
            if (Math.floor(i / 20) == f_balcony - 1) {
                if (not_found) {
                    min_i = i;
                    not_found = !not_found;
                }
                f_array_fans_20.push(all_fans_matches[i]);
            }
        }

        get_single_point();

    }

    function find_current_fan(all_fans_matches) {
        current_fan_match = all_fans_matches.filter((fanMatch, k) => {
            // console.log(`[fanMatch.fan:${fanMatch.fan}]`);
            // console.log(`[req.body.fan:${req.body.fan}]`);
            if (fanMatch.fan == req.body.fan) {
                current_index = k;
                return true;
            }
        });

        console.log(`[is_array:${Array.isArray(current_fan_match)}]`);
        console.log(current_fan_match);

        current_fan_match = current_fan_match[0];

        f_balcony = Math.floor(current_index / max_fans_in_balcony) + 1;
        f_max_balconies = Math.floor(total_amount_of_fans / max_fans_in_balcony) + 1;

        populate_fans();

    }


    function get_results() {
        FanMatch.find({
            team: req.body.team,
            round: req.body.round
        }, null, {
            sort: {
                score: -1
            }
        }, (err, result) => {
            if (err)
                return res.status(501).send(consts.jsonArr[6]);
            else {
                // console.log(result);
                all_fans_matches = result;
                total_amount_of_fans = all_fans_matches.length;
                amount_of_balconies = total_amount_of_fans % max_fans_in_balcony;
                find_current_fan(all_fans_matches);
            }
        });
    }

    get_results();
};
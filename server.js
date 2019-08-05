const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fansLeagueController = require('./controller/fansLeagueController'),
    port = process.env.PORT || 3000,
    path = require("path");

/*
 * app usages
 */
app.use('/',express.static(`${__dirname}/html`)); //for API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use( (req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

/*
 * default rout
 */
app.all('*', (req,res,next)=>{  // Global handler
    req.next();
});

app.get('/', (req,res,next) => {
    res.send(`${__dirname}/index.html`);
    req.next();
});


app.post('/getAllFansProfile', fansLeagueController.getAllFansProfile);
app.post('/saveNew', fansLeagueController.saveNew);
app.post('/saveMultipleNewFanProfile', fansLeagueController.saveMultipleNewFanProfile);
app.post('/saveMultipleNewTeam', fansLeagueController.saveMultipleNewTeam);
app.post('/saveMultipleSeasonRound', fansLeagueController.saveMultipleSeasonRound);
app.post('/saveMultipleFanMatch', fansLeagueController.saveMultipleFanMatch);
app.post('/getFansByTeamAndRound', fansLeagueController.getFansByTeamAndRound);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

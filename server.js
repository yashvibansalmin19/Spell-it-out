const { response } = require('express');
var express = require('express');
var pg = require('pg');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());

var conString = "postgres://gdrvrphexuocwy:9123f4f7d12e6b6800bbb0d3d951301c08cd481b0f26dc718618c3ef6d343f37@ec2-52-207-15-147.compute-1.amazonaws.com:5432/dd66hoifpis9ld";

var client = new pg.Client({
    connectionString: conString,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

var PORT = 5400;

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/getword', function (req, res) {
    var words = ['rock', 'paper', 'scissors', 'lamp', 'curtain', 'pillow'];
    var vis = [0, 0, 0, 0, 0, 0];
    var number = Math.floor(Math.random() * words.length);
    var word = words[number];
    vis[word] = 1;
    res.json({
        "word": word,
    })
});

app.post('/wrongAns', function (req, res) {
    var user = req.body["username"];
    var userWord = req.body["word"];
    var result = 0;
    client.query(`SELECT attempts FROM Attempts WHERE username='${user}' AND word='${userWord}'`)
        .then((response) => {
            if ((response["rows"].length > 0)) {
                result = response["rows"][0]["attempts"];
            }
            else {
                result = 1;
                client.query(`INSERT INTO Attempts VALUES ('${user}', '${userWord}', 1)`);
                // console.log(result);
            }
        });
    if (result >= 3) {
        res.json({
            "attempts": result,
        })
    }
    else {
        client.query(`UPDATE Attempts SET attempts='${result + 1}' WHERE username='${user}' AND word='${userWord}'`);
    }
    res.json({
        "attempts": result,
    })
});

app.post('/rightAns', function (req, res) {
    console.log(req.body);
    var user = req.body["username"];
    var userScore;
    console.log(`SELECT score FROM Scores WEHRE username ='${user}'`);

    client.query(`SELECT score FROM Scores WHERE username = '${user}'`)
        .then((response) => {
            console.log(response);
            if (response["rows"].length == 0) {
                client.query(`INSERT into Scores VALUES ('${user}',1)`);
            }
            else {
                userScore = req.body["score"];
                client.query(`UPDATE Scores SET score='${userScore + 1}' WHERE username='${user}'`);
            }
        })

});

app.listen(PORT, function () {
    console.log('server running on http://localhost:5400');
});

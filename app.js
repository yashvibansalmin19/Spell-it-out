let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

var words = ['rock', 'paper', 'scissors', 'lamp', 'curtain', 'pillow'];
var number = Math.floor(Math.random() * words.length);
var word = words[number];
var trial = 0;
var score = 0


document.querySelector("#start").addEventListener("click", () => {
    speech.text = word;
    answer = document.getElementsByName("speech.text");
    window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
    window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
    window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});

document.querySelector("#submit").addEventListener("click", () => {
    var answerInput = document.getElementById("answerText").value;
    console.log("answer : " + answerInput);
    console.log("word : " + word);


    if (word == answerInput) {
        score++;
        console.log("Congratulations!");
    }
    else {
        trial++;
        if (trial == 3) {
            console.log("Game Over!");
        }
    }

});

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});
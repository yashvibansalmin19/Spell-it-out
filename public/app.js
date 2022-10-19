let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

var word;
var score;
var Name = window.prompt("Enter your name");

fetch('http://localhost:5400/getword')
    .then((response) => response.json())
    .then((data) => {
        word = data["word"]

    });

document.querySelector("#start").addEventListener("click", () => {
    speech.text = word;
    answer = document.getElementsByName("speech.text");
    window.speechSynthesis.speak(speech);
});

document.querySelector("#submit").addEventListener("click", () => {
    var answerInput = document.getElementById("answerText").value;
    console.log("answer : " + answerInput);
    console.log("word : " + word);
    var wordAvailable = ['rock', 'paper', 'scissors', 'lamp', 'curtain', 'pillow'];

    if (word == answerInput) {
        // var index = wordAvailable.indexOf(word);
        // delete wordAvailable[index];
        fetch('http://localhost:5400/rightAns', {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                word: word,
                username: Name,
                userscore: score,
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })

    }
    else {
        var check = true;
        fetch('http://localhost:5400/wrongAns', {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                username: Name,
                word: word,
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => {
                console.log(json);
                if (json["attempts"] >= 3) {
                    check = false;
                }
                else {
                    window.alert("Wrong Ans! Please try again");
                }
            });

        if (!check) {
            window.openForm();
        }
    }

});

function openForm() {
    document.getElementById("GameOver").style.display = "block";
}
function closeForm() {
    document.getElementById("GameOver").style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    let modal = document.getElementById('GameOver');
    if (event.target == modal) {
        closeForm();
    }
}



let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

var word;

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


    if (word == answerInput) {
        score++;
        console.log("Congratulations!");
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
                if (json["attempts"] >= 3) {
                    check = false;
                }
            });

        if (!check) {
            window
        }
    }

});



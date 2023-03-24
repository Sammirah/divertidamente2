prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:350,
    imageFormat : 'png',
    pngQuality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function tirarfotita() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="POKEMONTEMOSQUEPEGALOSEUSEI" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PJHLFamkL/model.json',modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 ="A primeira previsão é " + prediction1;
    speakData2 ="A segunda previsão é " + prediction2;
    var uttherThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(uttherThis);
}

function verify() {
    img = document.getElementById('POKEMONTEMOSQUEPEGALOSEUSEI');
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;

        speak();
        if(results[0].label == "alegria") 
        {
            document.getElementById("updateEmoji").innerHTML = "&#128512"
        }
        if(results[0].label == "tristeza") 
        {
            document.getElementById("updateEmoji").innerHTML = "&#128532"
        }
        if(results[0].label == "raiva") 
        {
            document.getElementById("updateEmoji").innerHTML = "&#128545"
        }
        if(results[0].label == "nojo") 
        {
            document.getElementById("updateEmoji").innerHTML = "&#128580"
        }

        if(results[1].label == "alegria") 
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128512"
        }
        if(results[1].label == "tristeza") 
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128532"
        }
        if(results[1].label == "raiva") 
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128545"
        }
        if(results[1].label == "nojo") 
        {
            document.getElementById("updateEmoji2").innerHTML = "&#128580"
        }
    }
}
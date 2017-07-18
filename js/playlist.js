var ctx = new AudioContext();
var myAudio = new Audio();
var idle = 0;


var playlistHistory = new Array();
var playlistArr = new Array();
var randomArr = new Array();
// 0 = PAUSED | 1 = PLAYING | 2 = RANDOM
var mode = 0;
var current;
var random;
class Music {
    constructor(title, authors, path, minutes, seconds, id) {
        this.title = title;
        this.authors = authors;
        this.path = path;
        this.minutes = minutes;
        this.seconds = seconds;
        this.id = id;

    }

    setupOnClick() {
        var oThis = this;
        document.getElementById("music_" + this.id).onclick = function () {
            console.log("Playing " + oThis.title);
            oThis.playTitle();

        }
    }

    onClick() {

    }

    playTitle() {
        setPlaying(this);
    }
}




setupPlaylist();

function updatePlaylist() {
    if(myAudio.paused && !myAudio.ended) return;
    if (!random) {
        if (myAudio.ended) {
            newIndex = playlistArr.indexOf(current) + 1;
            setPlaying(playlistArr[newIndex > playlistArr.length - 1 ? 0 : newIndex]);
        }
        myAudio.play();

    } else {
        //RANDOM
        if (myAudio.ended) {
            newIndex = Math.floor(getRandomNumber(0, playlistArr.length - 1));
            setPlaying(playlistArr[newIndex]);
        }
        myAudio.play();
    }
}
myAudio.onended = function () {
    updatePlaylist();
}

function play() {
    shatter.src = "img/logo2.svg";
    if (myAudio.src == "")
        setPlaying(playlistArr[0]);
    else {
        myAudio.play();
        updatePlaylist();
    }

}


function skipMusic() {
    setRandom();
    updatePlaylist();
}


function setPlaying(music) {

    if (typeof current != 'undefined')
        playlistHistory.push(current); // Add current music to the history
    if (music == null) return;
    if (typeof current != 'undefined')
        document.getElementById("music_" + current.id).className = "music";
    document.getElementById("music_" + music.id).className = "music musicActive";
    current = music; // Set new current music
    myAudio.src = current.path;
    myAudio.play();
    playBtn.className = "fa fa-play activeBtn";
    myAudio.volume = 1;
    mode = 1;
}


function setPaused() {
    shatter.src = "img/shatter2.svg";
    myAudio.pause();
     playBtn.className = "fa fa-play";
}

function setRandom() {
    random = !random;
    return random;
}

function getAudio() {
    return myAudio;
}



function getRandomNumber(i, z) {
    return Math.random() * ((z + 1) - i) + i
}

function addNewMusic(path, name, author) {
    idle++;
    path = "music/" + path;
    /*var blob = null;
    var xhr = new XMLHttpRequest();
    

    xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
    xhr.onload = function () {

        blob = xhr.response; //xhr.response is now a blob object
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);

        reader.onload = function () {
            var ctx2 = new AudioContext();
            ctx2.decodeAudioData(reader.result).then(
                function (res) {
                    console.log("ready")
                    var minutes = Math.floor(res.duration / 60);
                    var seconds = Math.round(res.duration) - (minutes * 60);
                    playlistArr.push(new Music(name, author, path, minutes, seconds, playlistArr.length));
                    idle--;

                });

        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) console.log("ready")
    }
    xhr.open("GET", path, true);
    xhr.send();*/
    var myAudio2 = new Audio();
    myAudio2.src = path;
    myAudio2.oncanplaythrough = function () {
        console.log("Registering " + name + "...")
        var minutes = Math.floor(myAudio2.duration / 60);
        var seconds = Math.round(myAudio2.duration) - (minutes * 60);
        playlistArr.push(new Music(name, author, path, minutes, seconds, playlistArr.length));
        idle--;
    }


}

function setupPlaylist() {

    addNewMusic("Chum.mp3", "Chum", "EarlSweatshirt");
    addNewMusic("Couch Featuring Ace Creator.mp3", "Couch Featuring Ace Creator", "EarlSweatshirt");
    addNewMusic("Earl.mp3", "Earl", "EarlSweatshirt");
    addNewMusic("epaR Featuring Vince Staples.mp3", "epaR Featuring Vince Staples", "EarlSweatshirt");
    addNewMusic("Kill.mp3", "Kill", "EarlSweatshirt");
    addNewMusic("Luper.mp3", "Luper", "EarlSweatshirt");
    addNewMusic("Moonlight Featuring Hodgy Beats.mp3", "Moonlight Featuring Hodgy Beats", "EarlSweatshirt");
    addNewMusic("Pigions Featuring Wolf Haley.mp3", "Pigions Featuring Wolf Haley", "EarlSweatshirt");
    addNewMusic("Stapleton.mp3", "Stapleton", "EarlSweatshirt");
    addNewMusic("Thisniggaugly.mp3", "Thisniggaugly", "EarlSweatshirt");
    addNewMusic("Wakeupfaggot.mp3", "Wakeupfaggot", "EarlSweatshirt");
    addNewMusic("Whoa.mp3", "Whoa", "EarlSweatshirt");
    composeTitles();




}


function composeTitles() {
    if (idle > 0) {
        setTimeout(function () {
            composeTitles()
        }, 100);
        return;
    } else {
        console.log("Loaded all musics...");
        console.log(playlistArr)
        playlistArr = playlistArr.sort(function (a, b) {
            if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) return -1;
            if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) return 1;
            return 0;
        })
        console.log(playlistArr)
        for (i = 0; i < playlistArr.length; i++) {
            music = playlistArr[i];
            node = document.createElement("div")
            node.className = "music";
            node.id = "music_" + music.id;
            nodeP = document.createElement("p");
            nodeP.innerHTML = music.title;
            nodeP.className = "musicTitle";
            nodeP2 = document.createElement("p");
            nodeP2.innerHTML = music.minutes + ":" + pad2(music.seconds);
            nodeP2.className = "musicDuration";
            node.appendChild(nodeP);
            node.appendChild(nodeP2);
            musicsContainer.appendChild(node);
            music.setupOnClick();
        }
    }
}


function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

var cTest;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function curUnixTime() {
    return Date.now();
}

function clearData() {
    document.getElementById("linkDisplay").innerHTML = '';
    document.getElementById("cardNames").value = '';
}

function writeError(msg, cardName) {
    document.getElementById("linkDisplay").innerHTML += "<strong>" + cardName + ": " + msg + "</strong><br />";
    writeHR();
}

function writeHR() {
    document.getElementById("linkDisplay").innerHTML += "-------<br />";
}
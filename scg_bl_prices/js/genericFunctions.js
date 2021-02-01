let cTest;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const curUnixTime = () => Date.now();

const clearData = () => {
    document.getElementById("linkDisplay").innerHTML = '';
    document.getElementById("cardNames").value = '';
}

const writeError = (msg, cardName) => {
    document.getElementById("linkDisplay").innerHTML += "<strong>" + cardName + ": " + msg + "</strong><br />";
    writeHR();
}

const writeHR = () => document.getElementById("linkDisplay").innerHTML += "-------<br />";

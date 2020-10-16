function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearData() {
    document.getElementById("cardNames").value = '';
    document.getElementById("errorDisplay").innerHTML = '';
    document.getElementById("trollBuylist").innerHTML = '';
}

function writeError(msg, cardName) {
    document.getElementById("errorDisplay").innerHTML += "<strong>" + cardName + ": " + msg + "</strong><br />";
    writeHR();
}

function writeHR() {
    document.getElementById("linkDisplay").innerHTML += "-------<br />";
}
function clearData() {
    document.getElementById("cardNames").value = '';
    document.getElementById("statusDisplay").innerHTML = '';
    document.getElementById("trollBuylist").innerHTML = '';
}

function writeStatus(msg, cardName = "") {
    document.getElementById("statusDisplay").innerHTML += cardName ? "<strong>" + cardName + ": " + msg + "</strong><br />" : msg + "<br />";
    writeHR();
}

function writeHR() {
    document.getElementById("statusDisplay").innerHTML += "-------<br />";
}

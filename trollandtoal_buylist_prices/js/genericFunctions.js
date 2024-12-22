const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("statusDisplay").innerHTML = '';
    document.getElementById("displayData").innerHTML = '';
}

const writeStatus = (msg, cardName = "") => {
    document.getElementById("statusDisplay").innerHTML += cardName ? "<strong>" + cardName + ": " + msg + "</strong><br />" : msg + "<br />";
    writeHR();
}

const readTextArea = () => document.getElementById("cardNames").value.split("\n");

const writeHR = () => document.getElementById("statusDisplay").innerHTML += "-------<br />";

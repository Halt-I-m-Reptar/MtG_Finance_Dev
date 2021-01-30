function clearData() {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

function writeToDisplay(msg) {
    document.getElementById("listDisplay").innerHTML = "<strong>"+msg+"</strong>";
}

function writeError(err) {
    console.log("There was an error: "+err);
}

getCardNames = () => document.getElementById("cardNames").value.split("\n");


zeroFilterStatus = () => document.getElementById("filterZeros").checked
const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

const writeToDisplay = (msg) => document.getElementById("listDisplay").innerHTML = "<strong>"+msg+"</strong>";

const writeError = (err) => console.log("There was an error: "+err);

const getCardNames = () => document.getElementById("cardNames").value.split("\n");

const zeroFilterStatus = () => document.getElementById("filterZeros").checked;

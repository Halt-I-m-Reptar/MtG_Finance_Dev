const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const writeError = (error, cardName) => document.getElementById("displayData").innerHTML = `${error}<br />${cardName} was not found.`;

const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

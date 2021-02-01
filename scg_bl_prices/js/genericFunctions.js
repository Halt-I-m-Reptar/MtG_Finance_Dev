const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const curUnixTime = () => Date.now();

const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

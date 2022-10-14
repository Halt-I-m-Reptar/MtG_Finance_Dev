const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const curUnixTime = () => Date.now();

const clearData = () => {
    document.getElementById("linkDisplay").innerHTML = '';
    document.getElementById("cardNames").value = '';
}

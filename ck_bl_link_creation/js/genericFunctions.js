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
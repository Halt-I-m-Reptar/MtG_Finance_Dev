const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

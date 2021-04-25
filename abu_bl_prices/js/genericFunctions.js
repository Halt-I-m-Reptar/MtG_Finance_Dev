const writeError = (err) => console.log("There was an error: "+err);

const clearData = () => {
    document.getElementById("cardNames").value = '';
    document.getElementById("listDisplay").innerHTML = '';
}

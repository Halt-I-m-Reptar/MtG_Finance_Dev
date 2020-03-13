var ckData = [];

function writeToDisplay(msg) {
    document.getElementById("listDisplay").innerHTML = "<strong>"+msg+"</strong>";
}

function writeError(err) {
    console.log("There was an error: "+err);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loaderDisplay() {
    var loaderDisplay = document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "" ? "inherit" : "none";
    document.getElementById("loader").style.display = loaderDisplay;
}
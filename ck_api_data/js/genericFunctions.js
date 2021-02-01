let ckData = [];

const writeToDisplay = (msg) => document.getElementById("listDisplay").innerHTML = "<strong>"+msg+"</strong>";

const writeError = (err) => console.log("There was an error: "+err);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loaderDisplay = () => {
    let loaderDisplay = document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "" ? "inherit" : "none";
    document.getElementById("loader").style.display = loaderDisplay;
}

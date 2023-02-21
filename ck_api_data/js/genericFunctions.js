let ckData = [];

const writeToDisplay = (msg) => document.getElementById("listDisplay").innerHTML = "<strong>"+msg+"</strong>";

const writeError = (err) => console.log("There was an error: "+err);

const loaderDisplay = () => document.getElementById("loader").style.display = (document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "") ? "inherit" : "none";

const clearDisplayData = () => document.getElementById("listDisplay").innerHTML = '';

const showZeros = () => document.getElementById("showZeros").checked;

const checkSlug = () => document.getElementById("backupSlug").checked;

const toggleGetPrices = () => document.getElementById("getPrices").disabled = !document.getElementById("getPrices").disabled;

const enableCardDataDisplayButtons = () => {
    document.getElementById("filterCards").disabled = !document.getElementById("filterCards").disabled
    document.getElementById("clearFilters").disabled = !document.getElementById("clearFilters").disabled
};

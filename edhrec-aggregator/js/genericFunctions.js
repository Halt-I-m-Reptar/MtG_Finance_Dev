const writeError = (err) => {
    displayLoadIcon();
    console.warn("There was an error: "+err);
    writeContentToDisplay(err);
}

const getElementById = (domId) => document.getElementById(`${domId}`);

const getElementValueById = (domId) => document.getElementById(`${domId}`).value;

const setDataDisplay = (displayText = '') => document.getElementById("cardListDisplay").innerHTML = displayText;

const writeContentToDisplay = (msg) => document.getElementById("displayStatus").innerHTML = "<strong>"+msg+"</strong>";

const displayLoadIcon = () => document.getElementById("loader").style.display = (document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "") ? "inherit" : "none";

const prepDisplayDuringLoad = (displayText) => {
    setDataDisplay();
    writeContentToDisplay(`Gathering the top ${displayText}.`);
    displayLoadIcon();
}

const writeError = (err) => console.warn("There was an error: "+err);

const displayLoadIcon = (domId = 'loader') => document.getElementById(`${domId}`).style.display = (document.getElementById(`${domId}`).style.display === "none" || document.getElementById(`${domId}`).style.display === "") ? "inherit" : "none";

const cleanCkCardName = (card) => card.split(' (')[0].replace(/\W/g,'').toLowerCase();

const disableCKDataPull = (domId) => document.getElementById(`${domId}`).disabled = !document.getElementById(`${domId}`).disabled;

const getElementById = (domId) => document.getElementById(`${domId}`);

const getElementValueById = (domId) => document.getElementById(`${domId}`).value;

const getCheckedValue = (domId) => document.getElementById(`${domId}`).checked;

const setListDomInnerHTML = (domId = 'listDisplay', displayText = '') => document.getElementById(`${domId}`).innerHTML = displayText;

const enableCardDataDisplayButtons = () => {
    document.getElementById("filterCards").disabled = !document.getElementById("filterCards").disabled;
    document.getElementById("clearFilters").disabled = !document.getElementById("clearFilters").disabled;
    document.getElementById("showPercentDiff").disabled = !document.getElementById("showPercentDiff").disabled;
};

const showDataError = (displayText) => {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay', displayText);
}

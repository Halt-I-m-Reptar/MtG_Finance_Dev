const writeError = (err) => console.warn("There was an error: "+err);

const displayLoadIcon = (domId = 'loader') => document.getElementById(`${domId}`).style.display = (document.getElementById(`${domId}`).style.display === "none" || document.getElementById(`${domId}`).style.display === "") ? "inherit" : "none";

const cleanCkCardName = (card) => card.split(' (')[0].replace(/\W/g,'').toLowerCase();

const disableCKDataPull = (domId, status = false) => document.getElementById(`${domId}`).disabled = status;

const getElementById = (domId) => document.getElementById(`${domId}`);

const getElementValueById = (domId) => document.getElementById(`${domId}`).value;

const getCheckedValue = (domId) => document.getElementById(`${domId}`).checked;

const setListDomInnerHTML = (domId = 'listDisplay', displayText = '') => document.getElementById(`${domId}`).innerHTML = displayText;

const changeCardDataButtonDisplay = (status = false) => {
    document.getElementById("filterCards").disabled = status;
    document.getElementById("clearFilters").disabled = status;
    document.getElementById("showPercentDiff").disabled = status;
};

const showDataError = (displayText) => {
    displayLoadIcon();
    setListDomInnerHTML('listDisplay', displayText);
}

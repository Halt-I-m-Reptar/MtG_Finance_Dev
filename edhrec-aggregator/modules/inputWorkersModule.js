const getCardTypeValue = () => document.getElementById("topCardsByType").value;

const getCardColorValue = () => document.getElementById("topCardsByColor").value;

const getCardColorText = () => {
    const selector = document.getElementById("topCardsByColor");
    return selector.options[selector.selectedIndex].text;
}

const createOutputTable = () => document.getElementById("displayTopCards").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Name</th><th>Sanitized</th><th>Sanitized WO</th><th>URL</th><th>Inclusion</th><th>Label</th><th>Num Decks</th><th>Potential Decks</th><th>Percentage Usage</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

const percentDecks = (numerator, demonimator) => ((numerator / demonimator) * 100).toFixed(2)

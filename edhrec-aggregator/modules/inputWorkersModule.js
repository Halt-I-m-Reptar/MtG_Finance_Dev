const getCardTypeValue = () => document.getElementById("topCardsByType").value;

const getCardColorValue = () => document.getElementById("topCardsByColor").value;

const getCommanderColorValue = () => document.getElementById("topCommandersByColor").value;

const getCardColorText = () => {
    const selector = document.getElementById("topCardsByColor");
    return selector.options[selector.selectedIndex].text;
}

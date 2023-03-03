const getCardTypeValue = () => document.getElementById("topCardsByType").value;

const getCardColorValue = () => document.getElementById("topCardsByColor").value;

const getCommanderColorValue = () => document.getElementById("topCommandersByColor").value;

//this is probably going to get messy
const getTopCardValue = () => document.getElementById("topCardSearch").value;

const getCardColorText = () => {
    const selector = document.getElementById("topCardsByColor");
    return selector.options[selector.selectedIndex].text;
}

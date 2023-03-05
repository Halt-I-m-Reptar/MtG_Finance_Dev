const getCardTypeValue = () => getElementValueById("topCardsByType");

const getCardColorValue = () => getElementValueById("topCardsByColor");

const getCommanderColorValue = () => getElementValueById("topCommandersByColor");

const getTopCardValue = () => getElementValueById("topCardSearch");

const getCardColorText = () => {
    const selector = getElementById("topCardsByColor");
    return selector.options[selector.selectedIndex].text;
}
const getTopCardWorker = () => {
    prepCurlRequest('cards', cleanInputCardName( getTopCardValue() ), 'topIndividualCards');
    displayLoadIcon();
}

//This is going to get messy;
const cleanInputCardName = (cardName) => cardName.replace(/'/g,'').replace(/\W+/gi,'-').toLowerCase();

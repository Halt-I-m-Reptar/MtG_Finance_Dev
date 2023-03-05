const getTopCardWorker = () => {
    const searchCardName = getTopCardValue();
    prepDisplayDuringLoad( `cards played with ${searchCardName}` );
    prepCurlRequest('cards', cleanInputCardName( searchCardName) , 'topIndividualCards');
}

//This is going to get messy;
const cleanInputCardName = (cardName) => cardName.trim().replace(/'/g,'').replace(/\W+/gi,'-').toLowerCase();

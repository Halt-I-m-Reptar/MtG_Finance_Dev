// the 'asCommander' data set is a list of cards played alongside the commander thus the standard cord processing
// methods are applicable and the only demarcation we need is in the request url
const getTopCardWorker = () => {
    const searchCardName = getTopCardValue();
    const typeOfCardSearch = getElementValueQuerySelector('typeOfCardSearch') === 'asCard' ? 'cards' : 'commanders' ;
    prepDisplayDuringLoad( `cards played with ${searchCardName}` );
    prepCurlRequest(typeOfCardSearch, cleanInputCardName( searchCardName) , 'topIndividualCards');
}

//This is going to get messy;
const cleanInputCardName = (cardName) => cardName.trim().replace(/'/g,'').replace(/\W+/gi,'-').toLowerCase();

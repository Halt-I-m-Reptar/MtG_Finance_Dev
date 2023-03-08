// get search for preEDH
const fetchPreDHDeckLists = () => {
    const url= "https://api2.moxfield.com/v2/decks/search?pageNumber=1&pageSize=64&sortType=updated&sortDirection=Descending&fmt=predh&board=mainboard";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => buildOutput(result))
        .catch(error => writeError(error));
}

// get search for cards by Id
const fetchCommanderData = (cardId = 'k7xMp') => {
    const url = `https://api2.moxfield.com/v2/cards/details/${cardId}`;

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => writeError(error));
}
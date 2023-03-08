// get search for preEDH
const fetchPreDHDeckLists = () => {
    const url= "https://api2.moxfield.com/v2/decks/search?pageNumber=1&pageSize=64&sortType=updated&sortDirection=Descending&fmt=predh&board=mainboard";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    console.log(`${proxyUrl}${url}`);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${proxyUrl}${url}`, requestOptions)
        .then(response => response.text())
        .then(result => buildOutput(result))
        .catch(error => writeError(error));
}

// get search for cards by Id
const fetchCommanderData = (cardId) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api2.moxfield.com/v2/cards/details/k7xMp", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => writeError(error));
}
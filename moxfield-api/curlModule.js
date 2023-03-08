// get search for preEDH
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api2.moxfield.com/v2/decks/search?pageNumber=1&pageSize=64&sortType=updated&sortDirection=Descending&fmt=predh&board=mainboard", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


// get search for cards by Id
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api2.moxfield.com/v2/cards/details/k7xMp", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
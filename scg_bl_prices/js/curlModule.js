function curlRequest(cardName) {
    var url = "https://old.starcitygames.com/buylist/search?search-type=name&name="+cardName.replace(/\s/g,'%20');
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(proxyUrl+url, requestOptions)
        .then(response => response.json())
        .then(result => startOutput(result.results))
        .catch(error => writeError(error, cardName));
}
function curlRequest() {
    var url = "https://api.cardkingdom.com/api/pricelist";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => readableOutput(result))
        .catch(error => writeError(error));
}

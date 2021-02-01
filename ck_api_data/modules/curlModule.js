function curlRequest() {
    const url = "https://api.cardkingdom.com/api/pricelist";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => readableOutput(result))
        .catch(error => writeError(error));
}

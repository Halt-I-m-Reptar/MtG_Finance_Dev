const curlRequest = () => {
    //const url = "https://api.cardkingdom.com/api/pricelist";
    const url = "./ck_slug/pricelist.json";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => startDisplayOutput(result))
        .catch(error => writeError(error));
}

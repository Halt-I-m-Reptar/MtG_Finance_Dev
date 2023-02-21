const curlRequest = () => {
    const url = checkSlug() ? "https://api.cardkingdom.com/api/pricelist" : "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => setCKData(result))
        .catch(error => writeError(error));
}

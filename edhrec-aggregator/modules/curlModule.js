const shapeCurlURL = (metric, dimension) => `https://json.edhrec.com/pages/${ metric }/${ dimension }.json`;

const prepCurlRequest = (metric, dimension, identifier) => {
    curlRequest( shapeCurlURL(metric, dimension), identifier );
}

const curlRequest = (url, identifier) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(['topCardsByType','topCardsByColor', 'topCards', 'topCommanders', 'topIndividualCards'].includes(identifier)) { createTopCardsDataSet(result, 'cards'); }
            if(['topCommandersByColor'].includes(identifier)) { createTopCommanderByColorDataSet(result); }
        })
        .catch(error => writeError(error));
}

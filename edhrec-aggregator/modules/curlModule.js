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
            if(['topCardsByType','topCardsByColor', 'topCards'].includes(identifier)) { createTopsCardDataSet(result, 'cards'); }
            if(['topCommanders'].includes(identifier)) { createTopsCardDataSet(result,'commanders'); }
            if(['topCommandersByColor'].includes(identifier)) { createTopCommanderByColorDataSet(result); }
        })
        .catch(error => writeError(error));
}

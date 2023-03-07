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
            if( ['topCardsByType','topCardsByColor', 'topCards', 'topIndividualCards'].includes(identifier) ) { createTopCardsDataSet(result, 'asCard'); }
            if( ['topCommandersByColor','topCommanders'].includes(identifier) ) { createTopCardsDataSet(result, 'asCommander'); }
        })
        .catch(error => writeError(error));
}

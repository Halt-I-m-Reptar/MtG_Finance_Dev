const shapeCurlURL = (metric, dimension) => `https://json.edhrec.com/pages/${ metric }/${ dimension }.json`;

const curlRequest = (url, dimension) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(['topCardsByType','topCardsByColor', 'topCards'].includes(dimension)) { createTopsCardDataSet(result, 'cards'); }
            if(['topCommanders'].includes(dimension)) { createTopsCardDataSet(result,'commander'); }
            if(['topCommandersByColor'].includes(dimension)) { createTopCommanderByColorDataSet(result); }
        })
        .catch(error => writeError(error));
}

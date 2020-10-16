function curlRequest(cardName) {
    var url = 'https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php',
        proxyUrl = "https://cors-anywhere.herokuapp.com/",
        requestOptions = {
            method: 'POST',
            body: '{"action":"buylistsearch","deptCode":null,"searchwords":"'+cardName+'"}'
        };

    fetch(proxyUrl+url, requestOptions)
        .then(response => response.json())
        .then(result => startOutput(result.product))
        .catch(error => writeError(error));
}
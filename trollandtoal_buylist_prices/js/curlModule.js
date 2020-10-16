function curlRequest(product) {
    var url = 'https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php',
        proxyUrl = "https://cors-anywhere.herokuapp.com/",
        requestOptions = {
            method: 'POST',
            body: '{"action":"buylistsearch","deptCode":null,"searchwords":"'+product+'"}'
        };

    fetch(proxyUrl+url, requestOptions)
        .then(response => response.json())
        .then(result => !result.product ? writeStatus("Product not found: " + product) : startOutput(result.product))
        .catch(error => writeStatus(error));
}

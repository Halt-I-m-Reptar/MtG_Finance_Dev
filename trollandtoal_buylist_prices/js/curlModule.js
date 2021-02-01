function curlRequest(product) {
    //https://github.com/Rob--W/cors-anywhere/#documentation
    var url = 'https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php',
        proxyUrl = "https://cors-anywhere.herokuapp.com/",
        requestOptions = {
            method: 'POST',
            headers: {
                origin: 'https://www2.trollandtoad.com',
                referrer: 'https://www2.trollandtoad.com/buylist/',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36'
            },
            body: '{"action":"buylistsearch","deptCode":null,"searchwords":"'+product+'"}'
        };

    fetch(proxyUrl+url, requestOptions)
        .then(response => response.json())
        .then(result => !result.product ? writeStatus("Product not found: " + product) : startOutput(result.product))
        .catch(error => writeStatus(error));
}

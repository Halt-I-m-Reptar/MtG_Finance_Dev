function curlRequest(product) {
    const url = 'https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php';
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const curlHeaders = new Headers();
    curlHeaders.append("Referer", "https://www2.trollandtoad.com/buylist/");
    curlHeaders.append("Origin", "https://www2.trollandtoad.com");
    curlHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    curlHeaders.append("user", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36");
    curlHeaders.append("Cookie", "PHPSESSID=5ttj9lor5n3ofvjor1tjldpe62; spooky_mode=1716bf0b8383229f69ee157f260a237b");

    const requestOptions = {
        method: 'POST',
        headers: curlHeaders,
        body: "{\"action\":\"buylistsearch\",\"deptCode\":null,\"searchwords\":\""+product+"\"}"
    };

    fetch(proxyUrl+url, requestOptions)
        .then(response => response.json())
        .then(result => !result.product ? writeStatus("Product not found: " + product) : buildProductList(result.product))
        .catch(error => {
            console.log(error);
        });
}

function curlRequest(product) {
    const url = 'https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php';
    //*const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const curlHeaders = new Headers();
    curlHeaders.append("Referer", "https://www2.trollandtoad.com/buylist/");
    curlHeaders.append("Origin", "https://www2.trollandtoad.com");
    curlHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    curlHeaders.append("user", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36");
    curlHeaders.append("Cookie", "PHPSESSID=5ttj9lor5n3ofvjor1tjldpe62; spooky_mode=1716bf0b8383229f69ee157f260a237b");

    const requestOptions = {
        method: 'POST',
        headers: curlHeaders,
        body: `{"action":"buylistsearch","deptCode":null,"searchwords": ${product}}`,
        redirect: 'follow'
    };

    //fetch(proxyUrl+url, requestOptions)
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result) )//!result.product ? writeStatus("Product not found: " + product) : buildProductList(result.product))
        .catch(error => {
            console.log(error);
        });
}

/*

ar myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Cookie", "spooky_mode=1716bf0b8383229f69ee157f260a237b; PHPSESSID=a7ob4osulcpteq64tkmlb2j2o7");

var raw = "{\"action\":\"buylistsearch\",\"deptCode\":null,\"searchwords\":\"Experiment Kraj\"}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://www2.trollandtoad.com/buylist/ajax_scripts/buylist.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 */

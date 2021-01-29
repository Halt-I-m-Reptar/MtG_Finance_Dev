function curlWorker() {
    var interval = 1000;
    var promise = Promise.resolve();
    var curlUrls = generateCurlUrls(getCardNames());
    curlUrls.forEach(url=> {
        promise = promise.then(function () {
            curlRequest(url)
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
}

function curlRequest(url) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => parseVariants(result))
        .catch(error => writeError(error));
}

function getCardNames() {
    return document.getElementById("cardNames").value.split("\n");
}

function generateCurlUrls(cardArr) {
    return cardArr.map(cardName => "https://portal.binderpos.com/external/shopify/a7ba667f-72e6-4e88-a552-40bb741d7a10/cards/mtg?keyword="+cardName+"&limit=20");
}
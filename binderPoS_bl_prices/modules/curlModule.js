function curlWorker() {
    const interval = 1000;
    let promise = Promise.resolve();
    const curlBuylistUrlArr = generateCurlBuyListUrls(getCardNames(), getStoreList());
    curlBuylistUrlArr.forEach(storeData=> {
        promise = promise.then(function () {
            curlRequest(storeData);
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
}

function curlRequest(storeData) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(storeData[2], requestOptions)
        .then(response => response.json())
        .then(result => parseVariants(result, storeData[0], storeData[1]))
        .catch(error => writeError(error));
}

function generateCurlBuyListUrls(cardArr, binderPosStores) {
    let curlArr = [];
    Object.keys(binderPosStores).forEach( (storeName) => {
        cardArr.map(cardName => {curlArr.push([storeName, binderPosStores[storeName].url, "https://portal.binderpos.com/external/shopify/"+binderPosStores[storeName].binderPosId+"/cards/mtg?keyword="+cardName+"&limit=20", binderPosStores[storeName].retailPattern])});
    }, []);
    return curlArr;
}

function curlWorker() {
    const interval = 1000;
    let promise = Promise.resolve();
    const curlArr = generateCurlUrls(getCardNames(), getStoreList());
    curlArr.forEach(storeData=> {
        promise = promise.then(function () {
            curlRequest(storeData)
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
}

function curlRequest(storeData) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    fetch(storeData[1], requestOptions)
        .then(response => response.json())
        .then(result => parseVariants(result, storeData[0]))
        .catch(error => writeError(error));
}

function generateCurlUrls(cardArr, binderPosStores) {
    let curlArr = []
    Object.keys(binderPosStores).forEach( (storeName) => {
        cardArr.map(cardName => curlArr.push([storeName, "https://portal.binderpos.com/external/shopify/"+binderPosStores[storeName]+"/cards/mtg?keyword="+cardName+"&limit=20"]));
    }, []);
    return curlArr;
}

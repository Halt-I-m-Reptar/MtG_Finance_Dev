const priceWorker = () => {
    createTable();
    startPull(readTextArea());
}

function startPull(productAdd) {
    const interval = 1000;
    let promise = Promise.resolve();
    productAdd.forEach(product=> {
        promise = promise.then(function () {
            curlRequest(product);
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
    promise.then(function () {
        writeStatus('All products searched.');
    });

}

const buildProductList = (productList) => {
    const producArr = Object.values(productList).map(product => {
        return {
            "name": product.name,
            "isFoil": product.name.toLowerCase().includes('holo') || product.name.toLowerCase().includes('foil'),
            "category": product.catname,
            "condition": product.condition,
            "buyQty": product.buyqty,
            "buyPrice": product.buyprice,
            "sellQty": product.sellqty,
            "hotBuy": product.hotbuy
        };
    });
    writeInformation(producArr);
}

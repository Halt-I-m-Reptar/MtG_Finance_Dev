function priceWorker() {
    startPull(readTextArea());
}

function readTextArea() {
    return document.getElementById("cardNames").value.split("\n");
}

function startPull(productAdd) {
    var interval = 1000;
    var promise = Promise.resolve();
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

function startOutput(productList) {
    Object.values(productList).forEach(product => generateOutput(product));
}

function  generateOutput(cardDetails) {
    var outPut = {
        "name": cardDetails.name,
        "isFoil": cardDetails.name.toLowerCase().includes('holo') || cardDetails.name.toLowerCase().includes('foil') ? "Foil" : "",
        "category": cardDetails.catname,
        "condition": cardDetails.condition,
        "buyQty": cardDetails.buyqty,
        "buyPrice": cardDetails.buyprice,
        "sellQty": cardDetails.sellqty,
        "hotBuy": cardDetails.hotbuy
    };

    //var baseUrl = "https://www.trollandtoad.com/",
    //productUrl = baseUrl + "/" + cardDetails.deptcode + "/" + cardDetails.catname.toLowerCase().replace(/\W+/g,'-') + "/" + cardDetails.name.toLowerCase().replace(/\W+/gi,'-') + "/" + cardDetails.productid;

    writeInformation(outPut);
}

function writeInformation(display) {
    var tableRef = document.getElementById("trollBuylist");
    var newRow = tableRef.insertRow(-1);
    Object.values(display).forEach(data => {
        var newCell = newRow.insertCell(-1);
        newCell.appendChild(document.createTextNode(data));
    });
}

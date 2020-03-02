function priceWorker() {
    /*readTextArea().forEach( async (cardName) => {
        curlRequest(cardName)
        await sleep(2000)
    });*/
    startPull(readTextArea());

}

function readTextArea() {
    return document.getElementById("cardNames").value.split("\n");
}

async function startPull(cardArr) {
    for (var i in cardArr){
        curlRequest(cardArr[i]);
        await sleep(2000);
    }
}

function startOutput(cardVersions) {
    cTest = cardVersions;
    cardVersions.forEach( set =>
        set.forEach( details =>
            generateOutput(details)
        )
    );
    writeHR();
}

function  generateOutput(cardDetails) {
    var outPut = "";
    if ( cardDetails["foil"] ) { outPut = "<strong>Foil</strong> "; }
    outPut += cardDetails["name"];
    if ( cardDetails["language"].replace(/\s/g,'').toLowerCase() !== "english" ) { outPut += " (" + cardDetails["language"] + ")"; }
    outPut += ": ";
    outPut += cardDetails["category"] + " "; //set
    outPut += "(" + cardDetails["condition"] + ") ";
    outPut += "<strong>Price:</strong> " + parseFloat(cardDetails["price"]).toFixed(2);
    writeInformation(outPut);
}

function writeInformation(display) {
    document.getElementById("linkDisplay").innerHTML +=  display + "<br />";
}
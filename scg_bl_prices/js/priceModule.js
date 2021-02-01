const priceWorker= () => startPull(readTextArea());

const readTextArea = () => document.getElementById("cardNames").value.split("\n");

async function startPull(cardArr) {
    for (let i in cardArr){
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
    let outPut = "";
    if ( cardDetails["foil"] ) { outPut = "<strong>Foil</strong> "; }
    outPut += cardDetails["name"];
    if ( cardDetails["language"].replace(/\s/g,'').toLowerCase() !== "english" ) { outPut += " (" + cardDetails["language"] + ")"; }
    outPut += ": ";
    outPut += cardDetails["category"] + " "; //set
    outPut += "(" + cardDetails["condition"] + ") ";
    outPut += "<strong>Price:</strong> " + parseFloat(cardDetails["price"]).toFixed(2);
    writeInformation(outPut);
}

const writeInformation = (display) => document.getElementById("linkDisplay").innerHTML +=  display + "<br />";

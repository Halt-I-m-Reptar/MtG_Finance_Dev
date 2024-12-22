const linkWorker = () => writeLinks([...new Set(createLinks(readTextArea()))]);

cosnt =  readTextArea = () => document.getElementById("cardNames").value.split("\n");

function createLinks(cardNameArr) {
    const linkFirstHalf = '<a href="https://www.cardkingdom.com/purchasing/mtg_singles?filter%5Bsort%5D=price_desc&filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=';
    const linkLastHalf = '&filter%5Bcategory_id%5D=0&filter%5Bfoil%5D=1&filter%5Bnonfoil%5D=1&filter%5Bprice_op%5D=&filter%5Bprice%5D=&cacheBust='+curUnixTime()+'" target=_blank >';
    return cardNameArr.map( name => linkFirstHalf + name.replace(/\s/g, "%20") + linkLastHalf + name + "</a>" );
}

async function writeLinks(linkArr) {
    pauseClear();
    for ( var i in linkArr ) {
        document.getElementById("linkDisplay").innerHTML += linkArr[i] + "<br />";
        await sleep(1000);
    }
    pauseClear();
}

const pauseClear = () => document.getElementById("clearData").disabled = !document.getElementById("clearData").disabled;

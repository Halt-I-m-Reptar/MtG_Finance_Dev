const displayWorker = () => {
    document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Card Name</th><th>Set</th><th>Language</th><th>Buy Price</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';
    startPull(readTextArea());
}

const readTextArea = () => document.getElementById("cardNames").value.split("\n");

async function startPull(cardArr) {
    for (let i in cardArr){
        curlRequest(cardArr[i]);
        await sleep(2000);
    }
}

function createDataPoints(json) {
    const cardArr = json.map(cardsBySet => {
        return cardsBySet.map(cardsByCondition => {
            return {'name': cardsByCondition.name, 'set': cardsByCondition.category, 'language': cardsByCondition.language, 'buyPrice': cardsByCondition.price}
        })
    });
    generateOutput(cardArr);
}

function  generateOutput(cardDetails) {
    const table = document.getElementById("displayData");
    let row;
    let cell;
    cardDetails.forEach(cardBySet => {
        cardBySet.forEach( cardArr => {
            row = table.insertRow();
            Object.keys(cardArr).forEach( (cardDataKey, index) => {
                cell = row.insertCell(index);
                cell.innerHTML = cardArr[cardDataKey];
            });
        })
    })
}

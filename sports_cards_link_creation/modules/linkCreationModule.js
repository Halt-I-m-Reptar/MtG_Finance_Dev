const readTextArea = () => document.getElementById("productNames").value.length ? document.getElementById("productNames").value.split("\n").sort() : false;

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Product Name</th><th>Product URL</th></tr></thead><tbody id="productDisplayTable"></tbody></table>';

const createLinkForDisplay = url => `<a href="${url}" target="_blank">${url}</a>`;

function linkWorker() {
    try {
        const productArr = readTextArea();
        if (!productArr) { throw 0; }
        tableWorker( productArr );
    } catch (err) {
        document.getElementById("listDisplay").innerHTML = errObject()[err];
    }
}

function tableWorker( productArr ) {
    const storeListObj = getStoreList();
    createTable();
    productArr.forEach(productName => {
        Object.keys(storeListObj).forEach( storeName => {
            writeTableData( [storeName, productName, storeListObj[storeName].url ] );
        });
    });
}

function writeTableData( dataArr ) {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    row = table.insertRow();
    dataArr.forEach( (data, index)  => {
        cell = row.insertCell ( index );
        cell.innerHTML = index === 2 ? createLinkForDisplay(`${dataArr[index]}${dataArr[1]}` ) : `${data}`;
    })
}

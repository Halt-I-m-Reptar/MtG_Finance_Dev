const readTextArea = () => document.getElementById("productNames").value.length ? document.getElementById("productNames").value.split("\n").sort() : false;

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Product Name</th><th>Product URL</th></tr></thead><tbody id="productDisplayTable"></tbody></table>';

const createLinkForDisplay = url  => `<a href="${url}" target="_blank">${url}</a>`;

const errObject = () => ({0: "<h1>Please enter a list of products to search.</h1>"});

function linkWorker() { tableWorker(); }

function tableWorker() {
    try {
        const productArr = readTextArea();
        if (!productArr) { throw 0; }
        createTable();
        const storeListObj = getStoreList();
        productArr.forEach(productName => {
            Object.keys(storeListObj).forEach(storeKey => {
                writeTableData(storeKey, storeListObj, productName)
            });
        });
    } catch (err) {
        document.getElementById("listDisplay").innerHTML = errObject()[err];
    }
}

function writeTableData(storeKey, storeListObj, productName) {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    row = table.insertRow();
    cell = row.insertCell(0);
    cell.innerHTML = `${storeKey}`;
    cell = row.insertCell(1);
    cell.innerHTML = `${productName}`;
    cell = row.insertCell(2);
    cell.innerHTML = createLinkForDisplay(`${storeListObj[storeKey].url}${productName}` );
}

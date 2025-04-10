const readTextArea = () => document.getElementById("productNames" ).value.length ? document.getElementById("productNames" ).value.split( "\n" ).sort() : null;

const createTable = () => document.getElementById("listDisplay" ).innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Product Name</th><th>Product URL</th></tr></thead><tbody id="productDisplayTable"></tbody></table>';

const createLinkForDisplay = url => `<a href="${ url }" target="_blank">${ url }</a>`;

function linkWorker() {
    try {
        const productArr = readTextArea();
        if ( !productArr ) { throw 0; }
        tableWorker( productArr );
    } catch ( err ) {
        document.getElementById("listDisplay" ).innerHTML = errObject()[ err ];
    }
}

function tableWorker( productArr ) {
    const storeListObj = getStoreList();
    createTable();
    productArr.forEach( productName => {
        Object.keys( storeListObj ).forEach( storeName => {
            writeTableData( [ storeName, productName, storeListObj[ storeName ].url ] );
        });
    });
}

function writeTableData( displayDataArr ) {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    row = table.insertRow();
    displayDataArr.forEach( ( dataToDisplay, index )  => {
        cell = row.insertCell ( index );
        cell.innerHTML = index === 2 ? createLinkForDisplay(`${ displayDataArr[ index ] }${ displayDataArr[ 1 ] }` ) : `${ dataToDisplay }`;
    })
}

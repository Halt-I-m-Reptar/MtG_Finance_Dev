const displayCardDataWorker = ( filteredCardDataToDisplay)  => {
    displayLoadIcon();
    setListDomInnerHTML( 'listDisplay',`<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>SKU</th><th>Buy/Sell URLs</th><th>Card Name</th><th>Variation</th><th>Set</th><th>Foil</th><th>Retail Price</th><th>Retail Quantity</th><th>Buy Price</th><th>Buy Quantity</th><th>Buy %</th><th>Buy Price Credit</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeFilteredCardsTable( filteredCardDataToDisplay );
}

const writeFilteredCardsTable = ( filteredCardDataToDisplay ) => {
    const table = getElementById( "displayData" );
    filteredCardDataToDisplay.forEach( individualCardListings => {
        if (!getCheckedValue( 'showZeros' ) && individualCardListings[ 'qty_buying' ] === 0) { return; }
        addDataToTable( table, individualCardListings );
    });
}

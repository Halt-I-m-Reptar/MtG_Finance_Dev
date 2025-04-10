const hotlistDisplayWorker = ( filteredCardDataToDisplay ) => {
    displayLoadIcon();
    setListDomInnerHTML( 'listDisplay' , `<table id="displayData" class="displayData"><thead><tr><th>CK Id</th><th>Card Name</th><th>Retail Price</th><th>Buy Price</th><th>Buy/Sell URLs</th><th>Set</th><th>Model</th><th>Buy %</th><th>Buy Price Credit</th><th>Buy Quantity</th><th>Retail Quantity</th><th>SKU</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>`);
    writeHotlistTable( sortedHostList( filteredCardDataToDisplay ) );
}

const sortedHostList = ( filteredCardDataToDisplay ) => {
    return Object.keys( filteredCardDataToDisplay ).map( currentCard => filteredCardDataToDisplay[ currentCard ] )
        .reduce( ( acc, currentCard ) => {
            currentCard.map( cardData => acc.push( cardData ) )
            return acc;
        }, []).sort( ( firstCard, second ) => {
            const firstCardName = firstCard.name.toUpperCase();
            const secondCardName = second.name.toUpperCase();
            if ( firstCardName > secondCardName ) { return 1;}
            if ( firstCardName < secondCardName ) { return -1;}
            return 0;
    });
}

const writeHotlistTable = ( filteredCardDataToDisplay ) => {
    const table = getElementById( "displayData" );
    Object.values( filteredCardDataToDisplay ).forEach( cardElement => {
        addDataToTable( table,  cardElement )
    });
}

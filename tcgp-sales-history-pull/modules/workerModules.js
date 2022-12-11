function startDataPull() {
    const cardId = 452124;
    const iterationCount = 4;

    for ( let curIteration = 0; curIteration < iterationCount; curIteration++ ) {
        curlRequest(curIteration * 25, cardId);
    }
}

function workData(cardObj) {
    window.testArr = window.testArr || [];
    //console.log( cardObj );
    testArr.push( cardObj.data );
}

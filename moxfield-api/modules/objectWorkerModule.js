const createPreDHDataSet = (decksInList) => {
    window.preDHDataSet = {};
    let promises = [];

    decksInList['data'].forEach( deckInList => {
        promises.push( fetchCommanderData(deckInList['mainCardId'])
            .then(commanderJson => commanderJson )
            .then(commanderJson => {
                if( !Object.keys(window.preDHDataSet).includes(commanderJson['card']['name']) ) {
                    window.preDHDataSet[commanderJson['card']['name']] = {
                        [deckInList['id']]: {
                            mainCardId: deckInList['mainCardId'],
                            publicUrl: deckInList['publicUrl'],
                            deckName: deckInList['name'],
                            deckId: deckInList['id']
                        }
                    }
                } else {
                    window.preDHDataSet[commanderJson['card']['name']][deckInList['id']] = {
                        mainCardId: deckInList['mainCardId'],
                        publicUrl: deckInList['publicUrl'],
                        deckName: deckInList['name'],
                        deckId: deckInList['id']
                    }
                }
            })
        );
    });

    Promise.all(promises).then(() => buildOutput());
}

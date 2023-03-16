const createDataSet = (decksInList) => {
    window.commanderVariantDataSet = {};
    let promises = [];

    decksInList['data'].forEach( deckInList => {
        promises.push( fetchCommanderData(deckInList['mainCardId'])
            .then(commanderJson => {
                if( !Object.keys(window.commanderVariantDataSet).includes(commanderJson['card']['name']) ) {
                    window.commanderVariantDataSet[commanderJson['card']['name']] = {
                        [deckInList['id']]: {
                            mainCardId: deckInList['mainCardId'],
                            publicUrl: deckInList['publicUrl'],
                            deckName: deckInList['name'],
                            deckId: deckInList['id']
                        }
                    }
                } else {
                    window.commanderVariantDataSet[commanderJson['card']['name']][deckInList['id']] = {
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

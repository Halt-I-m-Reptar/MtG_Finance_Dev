const createDataSet = (format, decksInList) => {
    window.commanderVariantDataSet = {};
    let promises = [];

    if ( format === 'predh' ) {
        decksInList['data'].forEach(deckInList => {
            promises.push(fetchCommanderData(deckInList['mainCardId'])
                .then(commanderJson => {
                    if (!Object.keys(window.commanderVariantDataSet).includes(commanderJson['card']['name'])) {
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
    } else if (format === 'oathbreaker'){
        decksInList['data'].forEach(deckInList => {
            promises.push(fetchOathbreakerData(deckInList['publicId'])
                .then(oathbreakerJson => {
                    if (!Object.keys(window.commanderVariantDataSet).includes(Object.keys(oathbreakerJson['commanders'])[0])) {
                        window.commanderVariantDataSet[Object.keys(oathbreakerJson['commanders'])[0]] = {
                            [deckInList['id']]: {
                                mainCardId: deckInList['mainCardId'],
                                publicUrl: deckInList['publicUrl'],
                                deckName: deckInList['name'],
                                deckId: deckInList['id'],
                                signatureSpells: Object.keys(oathbreakerJson['signatureSpells'])[0],
                                signatureSpellsId: oathbreakerJson['signatureSpells'][Object.keys(oathbreakerJson['signatureSpells'])[0]]['card']['id']
                            }
                        }
                    } else {
                        window.commanderVariantDataSet[Object.keys(oathbreakerJson['commanders'])[0]][deckInList['id']] = {
                            mainCardId: deckInList['mainCardId'],
                            publicUrl: deckInList['publicUrl'],
                            deckName: deckInList['name'],
                            deckId: deckInList['id'],
                            signatureSpells: Object.keys(oathbreakerJson['signatureSpells'])[0],
                            signatureSpellsId: oathbreakerJson['signatureSpells'][Object.keys(oathbreakerJson['signatureSpells'])[0]]['card']['id']
                        }
                    }
                })
            );
        });
    }

    Promise.all(promises).then(() => buildOutput(format));
}

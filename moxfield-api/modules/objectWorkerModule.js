const createDataSet = (decksInList) => {
    window.commanderVariantDataSet = {};
    let promises = [];

        decksInList['data'].forEach(currentDeck => {
            promises.push(fetchDeckData( {cardId: currentDeck['mainCardId'], publicId: currentDeck['publicId']} )
                .then(commanderJson => {
                    const commander = commanderLocationMap(commanderJson);
                    buildDataObject(commanderJson, currentDeck, commander);
                })
            );
        });

    Promise.all(promises).then(() => buildOutput());
}

const commanderLocationMap = (commanderJson) => {
    const commanderMap = {
        predh: function() { return commanderJson['card']['name']; },
        oathbreaker: function() { return Object.keys(commanderJson['commanders'])[0]; }
    }

    return commanderMap[window.moxfieldFormat]();
}

const buildDataObject = (commanderJson, currentDeck, commander) => {
    if (!Object.keys(window.commanderVariantDataSet).includes(commander)) {
        window.commanderVariantDataSet[commander] = {
            [currentDeck['id']]: returnDeckObjectBody (commanderJson, currentDeck)
        }
    } else {
        window.commanderVariantDataSet[commander][currentDeck['id']] = returnDeckObjectBody (commanderJson, currentDeck)
    }
}

const returnDeckObjectBody = (commanderJson, currentDeck) => {
    return {
        mainCardId: currentDeck['mainCardId'],
        publicUrl: currentDeck['publicUrl'],
        deckName: currentDeck['name'],
        deckId: currentDeck['id'],
        signatureSpells: commanderJson?.signatureSpells ? Object.keys(commanderJson['signatureSpells'])[0] : null,
        signatureSpellsId: commanderJson?.signatureSpells ? commanderJson['signatureSpells'][Object.keys(commanderJson['signatureSpells'])[0]]['card']['id'] : null
    }
};

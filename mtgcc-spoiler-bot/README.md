


TODO:
spoiler logic and set check logic need to be forked


change channel from a static value to a variable
skip embed output for spoiler is there are no embed text channels



https://scryfall.com/sets

https://mtgdecks.net/prices

let setTable = Array.from( document.getElementsByTagName('tr') ).filter( rows => rows.childElementCount === 5 && rows.lastElementChild.nodeName.toLowerCase() !== 'th')

setTable.forEach( setInfo => console.log( `set name: ${setInfo.children[1].innerText} - set type: ${setInfo.children[2].innerText} - set release: ${setInfo.children[4].innerText} `) )

setTable.forEach( setInfo => {
const setName = setInfo.children[1].innerText;
const setType = setInfo.children[2].innerText || 'N/A';
const releaseDate = setInfo.children[4].innerText;

    console.log( `set name: ${ setName } - set type: ${ setType } - set release: ${ releaseDate } `)
})

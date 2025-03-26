


TODO:
change channel from a static value to a variable

Set Release Date Work:
https://scryfall.com/sets

https://mtgdecks.net/prices

let setTable = Array.from( document.getElementsByTagName('tr') ).filter( rows => rows.childElementCount === 5 && rows.lastElementChild.nodeName.toLowerCase() !== 'th')

setTable.forEach( setInfo => console.log( `set name: ${setInfo.children[1].innerText} - set type: ${setInfo.children[2].innerText} - set release: ${setInfo.children[4].innerText} `) )

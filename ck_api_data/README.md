CardKingdom Inventory API Pull
Allows you to pull the entire CK MtG inventory and filter for specific cards you want

### Required:
* Chrome
* [CORS disabled for locahost testing](https://medium.com/@siddhartha.ng/disable-cross-origin-on-chrome-for-localhost-c644b131db19) // or a local HTTP server

## Info
* Once CORS has been disabled for localhost, per the link above, you will be able to utilize this utility, until that is completed, this will not work
* If you run the command from the above link and if opens multiple Chrome tabs, you either did not replace the "s within the command or were not in your root C:\ when running
* There is a built in delay between data fetches so we're not blasting SCG.

## Instructions
* Open index.html in Chrome (drag and drop)
* Click "Get Prices" to retrive all cards and quantities in CK's inventory
* Add each card you wish to filter for into the text box with, each on a new line
* Click "Filter Cards" to filter the CK inventory to display the desired cards
* Click "Clear Filters" to reset the card display

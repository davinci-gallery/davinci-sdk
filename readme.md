# DaVinci SDK


DaVinci SDK is a simple but powerful tool to interact with DaVinci platform. You can create NFTs or collections, then sell, buy, auction, bid, claim, explore all the platform has to offer and much more.

All you need to do is include the SDK file in your project then call any method like sdk.createNFT with some data and presto!


```js

let SDK = require('./davinci-sdk.js');
let sdk = new SDK(2); // 1.mainnet 2.testnet


async function main() {
    sdk.newWallet(process.env.PRIVATEKEY);  // Your private key
    console.log('Wallet', sdk.wallet);

    // To create an NFT
    let data = {
        name        : 'My first token',
        description : 'This is a cool token freshly minted',
        saleprice   : 10.00,
        file        : './image.jpg',   // absolute or relative path to image
    };

    let info = await sdk.createNFT(data);
    console.log('New token', info);
}

main();

```

Just like that!


## Token data

For a more complex NFT there are some extra fields you can submit like:

```js
let data = {
    collection  : sdk.collection.image,    // newCollection() or sdk.collection.image
    media       : sdk.media.image,         // image|model|music|video|book
    category    : 0,                       // 0:digital 1:painting 2:photos 3:kids 8:memes 9:adult,
    name        : 'My first token',
    description : 'This is a cool token freshly minted',
    tags        : 'nft token cool',        // Words separated by spaces
    saletype    : 0,                       // 0:market 1:auction 2:notforsale
    saleprice   : 10.00,                   // Initial price if auction
    reserve     : 20.00,                   // Auction only, double the initial price
    inidate     : '2021-01-20',            // Auction start date
    enddate     : '2021-01-31',            // Auction end date
    royalties   : 10.00,                   // Percentage in sales for the author
    copies      : 100,                     // Number of copies available for sale
    unlock      : false,                   // To claim stuff in external sites
    unlockcode  : 'unlock code',           // Secret code if unlocked
    file        : './work/sdk/image.jpg',  // Absolute or relative path to file
    cover       : './work/sdk/cover.jpg'   // Cover image if resource is not image
};
```


## Collections

All NFTs will be added to collections, most NFTs will be grouped in public DaVinci collections that you can choose according to the media type as:

```
sdk.collection.image
sdk.collection.model
sdk.collection.music
sdk.collection.video
sdk.collection.book
```

If you want to create your own private collection for your music, paintings, etc you can do so using the sdk.newCollection method like:

```js
let info = await sdk.newCollection('Iron Maiden', '2021 Heavy Metal World Tour', './eddie.jpg');
console.log('New collection', info);
let myCollection = info.address;
```

Then use the collection address in your NFT data:

```js
    let data = {
        collection  : myCollection,
        media       : sdk.media.music,
        name        : 'Heaven can wait',
        description : 'This is the first song of the tour',
        tags        : 'iron maiden tour heavy metal'
        saleprice   : 5.00,
        file        : './heaven.mp3',
        cover       : './heaven.jpg',
    };
````

### Prerequisites:
```
> npm install @harmony-js/core
> npm install node-fetch
> npm install form-data
```


### Final Notes

• You can upload up to 5 NFTs per day when verified
• If not verified yet, only 1 NFT will be allowed daily
• Ask our community managers for verification in our social channels
• Keep your files and images up to 30 MB in size
• Copyrighted material is prohibited and will get you banned from our platform
• Adult content goes in its own category (9), please keep our space safe for children

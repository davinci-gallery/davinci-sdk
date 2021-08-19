# DaVinci SDK


DaVinci SDK is a simple but powerful tool to interact with DaVinci platform. You can create NFTs or collections, then sell, buy, auction, bid, claim, explore all the platform has to offer and much more.

All you need to do is include the SDK file in your project then call any method like sdk.createNFT with some data and presto!


```js

let SDK = require('./davinci-sdk.js');
let sdk = new SDK(process.env.CHAINID); // 1.mainnet 2.testnet


async function main() {
    sdk.newWallet(process.env.PRIVATEKEY);  // Your private key
    console.log('Wallet', sdk.wallet);

    // To create an NFT
    let data = {
        name       : 'My first token',
        description: 'This is a cool token freshly minted',
        saleprice  : 10.00,
        file       : './image.jpg',   // absolute or relative path to image
    };

    let info = await sdk.createNFT(data);
    console.log('New token', info);
}

main();

```

Just like that!

### Prerequisites:
```
> npm install @harmony-js/core
> npm install node-fetch
> npm install form-data
```
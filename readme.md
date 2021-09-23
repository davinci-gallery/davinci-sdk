# DaVinci SDK 2.0.2

DaVinci SDK is a tool for interacting with DaVinci NFT platform. It is suitable for CLI and Web use by just including the respective library.

[DaVinci WEB](./sdk-web) - for use in browsers

[DaVinci CLI](./sdk-cli) - for use in terminal

# DaVinci SDK for the web

DaVinci SDK is a simple but powerful tool to interact with DaVinci platform in the browser. You can create NFTs or collections, then sell, buy, auction, bid, claim, explore all the platform has to offer and much more.

All you need to do is include the SDK file in your project then call any method like sdk.createNFT with some data and presto!


```html

<!DOCTYPE html>
<html>
<head>
    <title>DaVinci SDK</title>
</head>
<body>
    <h5>DaVinci SDK Test</h5>
</body>
<script src="./web3.min.js"></script>
<script src="./HarmonyJs.browser.js"></script>
<script src="./davinci-web.js"></script>
<script>
var sdk = null;

function main() {
    sdk = new DaVinciSDK(2);               // 0.local 1.mainnet 2.testnet
    sdk.newWallet(sdk.walletType.harmony); // harmony or metamask
}

window.onload = main;
</script>
</html>
```

Just like that!


## Create NFT

``` js
// To create an NFT
let file = document.getElementById('file').files[0]
let data = {
    name        : 'My first token',
    description : 'This is a cool token freshly minted',
    saleprice   : 10.00,
    file        : file
}

let info = await sdk.createNFT(data)
console.log('New token', info)
```

## More examples
``` js
sdk.newCollection('Paintings', 'Description', file)
sdk.explore()           // Latest NFTs created
sdk.creations(address)  // NFTs by an artist
sdk.buy(nftID, owner)   // Buy NFT by ID and owner
sdk.bid(nftID, amount)  // Bid on NFT auction
```

Note: You will need to include libraries `web3` for Metamask and `HarmonyJs` for Harmony wallets

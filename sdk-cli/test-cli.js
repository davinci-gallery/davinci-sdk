let SDK = require('./davinci-sdk.js');
let sdk = new SDK(0); // 0.local 1.mainnet 2.testnet
sdk.setAccount(process.env.OPKEY);
//console.log('Account', sdk.account);
//sdk.newWallet(sdk.walletType.harmony);
//console.log('Wallet', sdk.wallet);
//sdk.wallet.connect();

async function main() {
    //console.log('neturl', sdk.neturl);
    //console.log('apiurl', sdk.apiurl);
    //console.log('server', sdk.server);
    //console.log('proxy ', sdk.proxy);

    // To create a new private collection
    //info = await sdk.newCollection('Test', 'SDK Test', path.join(__dirname, 'anyimg.jpg'));
    //info = await sdk.newCollection('Test', 'SDK Test', './work/sdk/anyimg.jpg');
    //console.log('New collection', info);
    
    // To create an NFT
    //let coladr = '0x742af3f43683d46be6df54c65a1250f27bdd5d09';  // previously minted
    let datax = {
        collection : sdk.collection.image, // newCollection() or sdk.collection.image
        media      : sdk.media.image,      // image|model|music|video|book
        category   : 0,                    // 0:digital 1:painting 2:photos 3:kids 8:memes 9:adult,
        name       : 'My first token',
        description: 'This is a cool token freshly minted',
        tags       : 'nft token cool',
        saletype   : 0,                    // 0:sale 1:auction 2:notforsale
        saleprice  : 10.00,
        reserve    : 0.00,
        inidate    : '2021-01-31',         // ini auction
        enddate    : '2021-01-31',         // end auction
        royalties  : 10.00,
        copies     : 10,
        unlock     : false,
        unlockcode : 'unlock code',           // if unlocked
        file       : './work/sdk/anyimg.jpg', // path to file
        cover      : './work/sdk/anyimg.jpg'  // needs cover if not image
    };

    // Minimum data needed, everything else to default
    let data = {
        name       : 'My first token',
        description: 'This is a cool token freshly minted',
        saleprice  : 10.00,
        file       : './work/sdk/anyimg.jpg',   // absolute or relative path to image
    };

    info = await sdk.createNFT(data);
    console.log('New token', info);
}

async function approve() {
    //let ok = await sdk.isApproved('0x742af3f43683d46be6df54c65a1250f27bdd5d09', sdk.proxy);
    //console.log('OK?', ok);
    let res = await sdk.approve('0x742af3f43683d46be6df54c65a1250f27bdd5d09', sdk.proxy);
    console.log('Approved', res);
    process.exit(0);
}

async function buy() {
    let res = await sdk.buy('0x77cb0e27711fd98eb65d9a14efdd30a7f347f889','0x8c7d955a7d6568a10cc6d9774e9eae7ff5191bd0'); // Flower #8, leet
    console.log('Buy result', res);
    process.exit(0);
}

async function explore(limit=100, page=0) {
    let res = await sdk.explore(limit, page);
    console.log('Explore result', res);
    process.exit(0);
}

async function creations(user, limit=100) {
    let res = await sdk.creations(user, limit);
    console.log('Creations result', res);
    process.exit(0);
}

//main();
//approve();
//buy();
explore(1);
//creations('0x8c7d955a7d6568a10cc6d9774e9eae7ff5191bd0', 1);


// END
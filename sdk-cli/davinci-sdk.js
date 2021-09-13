// Davinci SDK
let { Harmony } = require('@harmony-js/core');
let fs          = require('fs');
let path        = require('path');
let crypto      = require('crypto'); 
let fetch       = require('node-fetch');
let FormData    = require('form-data');
let Token1155   = require('../contracts/token1155.json');
let Market      = require('../contracts/market.json');
let Auction     = require('../contracts/auction.json');
//let Wallet      = require('./wallet.js');

function log(...args) { console.warn(args.join(' ')); }

function addDays(date, days) { 
    let dd = new Date(date);
    dd.setDate(dd.getDate() + days);
    return dd;
}

function getMimeType(fileName) {
    if(!fileName){ return null; }
    let mime = '';
    let ext  = path.extname(fileName);
    switch(ext){
        case '.jpg' :
        case '.jpeg': mime = 'image/jpeg'; break;
        case '.png' : mime = 'image/png'; break;
        case '.gif' : mime = 'image/gif'; break;
        default     : mime = 'application/octet-stream'; break;
    }
    return mime;
}

async function randomAddress() {
    let buf = await crypto.randomBytes(20);
    let adr = '0x'+buf.toString('hex');
    return adr;
}

function queryParams(obj){
    return (new URLSearchParams(obj)).toString();
}

class DaVinciSDK {
    version    = '2.0.0';
    network    = 2; // 0.local 1.mainnet 2.testnet
    gateway    = 'https://ipfs.io/ipfs/';
    harmony    = null;
    collection = null;

    media = {
        image : 'image',
        model : 'model',
        music : 'music',
        video : 'video',
        book  : 'book'
    };

    category = {
        digital  : 0,
        painting : 1,
        photos   : 2,
        kids     : 3,
        memes    : 8,
        adults   : 9
    };

    connected = false;

    config = {
        gasprice : 3000000000,
        gaslimit :    1000000,
        local: {
            oneurl   : 'https://api.s0.b.hmny.io',
            apiurl   : 'https://localhost:5000/api/v2',
            server   : 'http://localhost:5000',
            explorer : 'https://explorer.pops.one/',
            proxy    : '0x7fed709f174af9d62c5980f3270ae0927350a03d',
            market   : '0x3609cbaa58edc93a683e9bfced5bc260fe58053a',
            auction  : '0xe8426dd6049040e6f24aa28fe50ff17982ead0db',
            collections : {
                image : '0xb7d284f72d3383363eedbeeea9a217e24b265c4b',
                model : '0xa016572ca6d307f4020ea1316b9c29f313e90e5f',
                music : '0x1b0b37a0bef0b0815131d1405eb65916225cba48',
                video : '0x6104c92989f9a08840d2773bd8eb50315056e89b',
                book  : '0x76f97e5d6f1fb562baa94c6917d94a44de0b7987'
            }
        },
        mainnet: {
            oneurl   : 'https://api.s0.t.hmny.io',
            apiurl   : 'https://davinci.gallery/api/v2',
            server   : 'https://davinci.gallery',
            explorer : 'https://explorer.harmony.one/',
            proxy    : '0xeda939305ffead73a1aa285a545b56a719b94990',
            market   : '0x1d89bc60cd482ddfae8208e6a14d6c185c2095a1',
            auction  : '0x762f89c3847658e8ff2c55281aa64fccad87b7cb',
            collections : {
                image : '0x1548c6227cbd78e51eb0a679c1f329b9a5a99beb',
                model : '0x4F1e81F6736b04a75E6A552A30Aa32787566C84d',
                music : '0xbde650853b535d738ce67f1bdeb335e38834a9e9',
                video : '0x474d8fd12780fbe2b7b7bd74eb326bb75ded91d8',
                book  : '0x51f6290510be3c802471e27f0843a3a54a8226df'
            }
        },
        testnet: {
            oneurl   : 'https://api.s0.b.hmny.io',
            apiurl   : 'https://testnet.davinci.gallery/api/v2',
            server   : 'https://testnet.davinci.gallery',
            explorer : 'https://explorer.pops.one/',
            proxy    : '0x7fed709f174af9d62c5980f3270ae0927350a03d',
            market   : '0x3609cbaa58edc93a683e9bfced5bc260fe58053a',
            auction  : '0xe8426dd6049040e6f24aa28fe50ff17982ead0db',
            collections : {
                image : '0xb7d284f72d3383363eedbeeea9a217e24b265c4b',
                model : '0xa016572ca6d307f4020ea1316b9c29f313e90e5f',
                music : '0x1b0b37a0bef0b0815131d1405eb65916225cba48',
                video : '0x6104c92989f9a08840d2773bd8eb50315056e89b',
                book  : '0x76f97e5d6f1fb562baa94c6917d94a44de0b7987'
            }
        }
    };

    get netname() { return ['local','mainnet','testnet'][this.network] || 'testnet'; }
    get chainid() { return ['0x2','0x1','0x2'][this.network]; }
    get neturl()  { return this.config[this.netname].oneurl; }
    get apiurl()  { return this.config[this.netname].apiurl; }
    get server()  { return this.config[this.netname].server; }
    get proxy()   { return this.config[this.netname].proxy; }
    get market()  { return this.config[this.netname].market; }
    get auction() { return this.config[this.netname].auction; }
    get account() { return this.harmony?.wallet?.defaultSigner || null; }

    constructor(network=2) {
        this.network = network;
        this.harmony = new Harmony(this.neturl, { chainType: 'hmy', chainId: this.chainid });
        this.collection = this.config[this.netname].collections;
        log('--', new Date());
        log(`DaVinci SDK ${this.version} is ready in ${this.netname}`);
        let inBrowser = (typeof(navigator)!=='undefined');
        log('In browser?', inBrowser);
    }

    setNetwork(network=2) {
        this.network = network;
        log('SDK network changed to', this.netname);
    }

    setAccount(key) {
        if(key){
            let account = this.harmony.wallet.addByPrivateKey(key);
            this.harmony.wallet.setSigner(account.address);
        }
    }

    async saveFile(file, cover, media) {
        if(!file){ return; }
        log('Saving file', file);
        log('To server', this.server);
        try {       
            var data = new FormData();
            data.append('media', media);
            let mime = getMimeType(file);
            let buff = fs.readFileSync(file);
            log('File type', mime);
            //data.append('file', buff);
            data.append('file', buff, {filepath:file, contentType:mime}); 
            if(cover){ 
                let mimc = getMimeType(cover);
                let bufc = fs.readFileSync(cover);
                log('Cover type', mimc);
                //data.append('cover', bufc); 
                data.append('cover', bufc, {filepath:cover, contentType:mimc}); 
                //data.append('file', fs.createReadStream(path.join(__dirname, file)));
            }
            let res = await fetch(this.server + '/token/upload', {method: "POST", headers: {cookie:'user='+this.account}, body: data});
            let rex = await res.json();
            //console.warn('Res', rex);
            if(rex.error) { console.error('Error:', rex.error); return null; }
            if(!rex.hash) { console.error('Error saving file to IPFS'); return null; }
            return rex.hash;
        } catch(ex){
            console.error('Error saving file', ex);
            return null;
        }
        return null;
    }

    async saveMetadata(meta) {
        console.warn('META', meta);
        if(!meta){ return null; }
        let opts = {
            method: 'POST', 
            headers: {'content-type': 'application/json'}, 
            body: JSON.stringify(meta)
        };

        let res, rex, hash = null;
        try {
            res = await fetch(this.server+'/token/metadata', opts);
            rex = await res.json();
            if(rex.error) { 
                console.error('Server error saving metadata', rex.error);
                return null;
            }
            if(!rex.hash) { 
                console.error('Server error, no hash returned', rex);
                return null;
            }
            hash = rex.hash;
        } catch(ex) {
            console.error('Server error:', ex);
            return null;
        }
        return hash;
    }

    async mintCollection(rec, mhash) {
        log('Mint collection for metahash', mhash);

        try {
            let name   = rec.name;
            let symbol = rec.symbol;
            let type   = rec.type;
            let uri    = mhash;
            let prefix = this.gateway;
            let gas    = { gasPrice: this.config.gasprice, gasLimit: 5000000, from: this.account };
            console.warn('Gas', gas);

            let arg = [name, symbol, this.account, uri, prefix];
            let inf = { arguments: arg, data: Token1155.bytecode };
            let abi = Token1155.abi;
            console.warn('New 1155 collection', arg);
            let ctr = this.harmony.contracts.createContract(abi);
            let res = await ctr.methods.contractConstructor(inf).send(gas);
            let ok = false;
            let txid = null;
            if (res.transaction.txStatus == 'REJECTED') { 
                ok = false; 
                txid = res.transaction.id; 
            } else if (res.transaction.txStatus == 'CONFIRMED') { 
                ok = true; 
                txid = res.transaction.id; 
            } else {
                console.error('Unknown error', res.transaction.txStatus);
                return {error: 'Unknown status: '+res.transaction.txStatus};
            }

            if (ok) {
                log('Confirmed');
                log('TX', txid);
                if(res.options && res.options.address){ 
                    let address = res.options.address
                    log('Deployed at ', address);
                    return {address:address};
                } else {
                    console.error('Error: no contract address');
                    return {error: 'Error creating collection, tx id: '+txid};
                }
            } else {
                log('Rejected', txid);
                return {error: 'Transaction rejected', txid: txid};
            }
        } catch(ex){ 
            console.error('Contract error:', ex) ;
            return {error: ex.message||ex};
        }
        return null;
    }


    // Creates a new 1155 token collection
    async newCollection(name, desc, file) {
        log('New collection');
        if(!this.account){ console.warn('Wallet not connected, please run sdk.setAccount(yourKey)'); return; }
        if(!name){ console.warn('Collection name is required'); return; }
        if(!desc){ console.warn('Collection decription is required'); return; }
        if(!file){ console.warn('Collection image is required'); return; }
        if(desc.length>1000){ console.warn('Description can not be longer than 1000 chars'); return; } 

        // Saving file to IPFS and getting hash
        log('Saving file, please wait...');
        let hash = await this.saveFile(file, null, 'image');
        if(!hash){ console.error('Error saving file to IPFS'); return; }
        log('IPFS Hash', hash); 

        let data = {
            type  : '1155',
            symbol: 'VINCI',
            owner : this.account,
            name  : name,
            desc  : desc,
            file  : file,
            hash  : hash
        };

        // Then save metadata
        let meta = {
            type          : '1155',
            symbol        : 'VINCI',
            name          : name,
            description   : desc,
            image         : hash,
            external_link : 'No'
        };

        log('Saving metadata, please wait...');
        let mhash = await this.saveMetadata(meta);
        if(!mhash){ console.error('Error saving metadata to IPFS'); return; }
        log('Meta Hash', mhash);

        log('Creating collection, please wait...');
        let rec = await this.mintCollection(data, mhash);
        if(!rec || rec.error){ console.error('Error creating collection'); return; }
        let address = rec.address.toLowerCase();
        if(!address){ console.error('Error creating collection'); return; }

        // TODO: Approve operator rights
        // TODO: Send collection to server

        return {address, hash, mhash};
    }

    async mintToken(nft) {
        log('Minting NFT...');
        try {
            nft.fees = [];
            if(nft.royalties>0){
                nft.fees = [[nft.creator, nft.royalties]];
            }

            let gas  = { gasPrice: this.config.gasprice, gasLimit: 5000000, from: this.account };
            let abi = Token1155.abi;
            let ctr = this.harmony.contracts.createContract(abi, nft.collection);
            let res = await ctr.methods.mint(nft.tokenid, nft.fees, nft.copies, nft.metahash).send(gas);

            if (res.transaction.txStatus == 'REJECTED') { 
                log('Rejected');
                return {error: 'REJECTED', txid: res.transaction.id};
            } else if (res.transaction.txStatus == 'CONFIRMED') { 
                log('Token minted in tx', res.transaction.id);
                return {status:'CONFIRMED', txid:res.transaction.id, address:nft.address};
            } else { 
                log('Error: Unknown status', res.transaction?.txStatus);
                return {error: 'Unknown status: '+(res.transaction?.txStatus||'Unknown')}; 
            }
        } catch(ex){ 
            console.error('Contract error:', ex);
            return {error: ex.message||ex};
        }

        return null;
    }

    async createNFT(nft) {
        log('New token');
        if(!this.account){ console.warn('Wallet not connected, please run sdk.setAccount(yourKey)'); return; }

        // Validate input
        if(!nft.name){ console.warn('Token name is required'); return; }
        if(!nft.description){ console.warn('Token description is required'); return; }
        if(nft.name.length>40){ console.warn('Token name must be less than 40 chars'); return; }
        if(nft.description.length>1000){ console.warn('Description must be less than 1000 chars'); return; }
        if(nft.saleprice<0){ console.warn('Token price is required'); return; }
        if(!nft.file){ console.warn('Token file is required'); return; }

        let address = await randomAddress();
        let now  = new Date();
        let day7 = addDays(now, 7);

        // Defaults
        nft.type       = '1155';
        nft.symbol     = 'VINCI';
        nft.creator    = this.account;
        nft.owner      = this.account;
        nft.address    = address;
        nft.tokenid    = address;
        nft.collection = nft.collection || this.collection.image;
        nft.media      = nft.media      || 'image';
        nft.category   = nft.category   || 0;
        nft.tags       = nft.tags       || '';
        nft.onsale     = nft.onsale     || true;
        nft.saletype   = nft.saletype   || 0;
        if(nft.saletype==2) { nft.onsale = false; }
        nft.saleprice  = nft.saleprice  || 0;
        nft.reserve    = nft.reserve    || parseInt(nft.saleprice/2);
        nft.inidate    = nft.inidate    || now.toJSON();
        nft.enddate    = nft.enddate    || day7.toJSON();
        nft.royalties  = nft.royalties  || 10;
        nft.copies     = nft.copies     || 1;
        nft.available  = nft.copies     || 1;
        nft.unlock     = nft.unlock     || false;
        nft.unlockcode = nft.unlockcode || '';

        if(nft.media!='image' && !nft.cover){ 
            log('If NFT is not an image then cover must be provided (jpg or png)'); 
            return;
        }

        // TODO: check collection owner

        // Verify user approved DaVinci as operator
        if(nft.onsale) {
            log('Checking operator rights...');
            let approved = await this.isApproved(nft.collection, this.account, this.proxy);
            if(approved) {
                log('DaVinci has operator rights');
            } else {
                log('Granting Davinci operator rights...')
                let res = await this.approve(nft.collection, this.proxy);
                if(!res || res.error) { 
                    log('Error approving operator rights');
                    return; 
                }
                log('Davinci granted operator rights');
            }
        }

        log('Saving file, please wait...');
        let hash = await this.saveFile(nft.file, nft.cover, nft.media);
        //let hash = 'hash123456789';
        if(!hash){ log('Error saving file to IPFS'); return; }
        log('IPFS Hash', hash);
        log('File saved!');

        // Save metadata
        let meta = {
            type          : '1155',
            symbol        : 'VINCI',
            name          : nft.name,
            description   : nft.description,
            image         : hash,
            external_link : 'No'
        }

        log('Saving metadata, please wait...');
        let mhash = await this.saveMetadata(meta);
        //let mhash = 'meta123456789';
        if(!mhash){ log('Error saving metadata to IPFS'); return; }
        log('Meta Hash', mhash);
        log('Metadata saved!');

        // Assign IPFS hashes
        nft.cover     = hash;
        nft.thumbnail = hash;
        nft.resource  = this.gateway+hash;
        nft.metadata  = this.gateway+mhash;
        nft.metahash  = mhash;

        //TODO: Charge minting fees?

        // Mint token
        let res = await this.mintToken(nft);
        //let res = {address:'0x1234567890'};
        if(!res.address){ console.error('Error minting NFT', res.error); return; }
        log('TokenId', res.address);

        // Send token to server
        log('Sending token to server');
        let rew = await fetch(this.server+'/token/new', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(nft)});
        let rex = await rew.json();
        //let rex = {ok:true};
        console.warn('Server response', rex);
        if(rex.error) { console.error(rex.error, true); return; }

        // If on sale: save order/auction
        if(nft.onsale){
            let rey, rez;
            if(nft.saletype==0){ // Direct sale
                log('Creating sell order, please wait...');
                rey = await fetch(this.server+'/api/neworder/'+nft.address, {method:'GET', headers:{cookie:'user='+this.account}});
                rez = await rey.json();
                console.warn('Order Response', rez);
            } else if(nft.saletype==1){ // Auction
                log('Creating auction order, please wait...');
                rey = await fetch(this.server+'/api/newauction/'+nft.address, {method: 'GET', headers:{cookie:'user='+this.account}});
                rez = await rey.json();
                console.warn('Auction Response', rez);
            }
        }
        log('SUCCESS!');
        log('Check your new NFT', this.server+'/view/'+nft.address);

        return {address:nft.address, hash:hash, meta:mhash};
    }

    async isApproved(collection, owner, operator) {
        log('Checking operator rights...')
        //log('Collection ', collection);
        //log('Token Owner', owner);
        //log('Operator   ', operator);

        try {   
            let gas = { gasPrice: this.config.gasprice, gasLimit: this.config.gaslimit, from: this.account };
            let ctr = this.harmony.contracts.createContract(Token1155.abi, collection);
            let res = await ctr.methods.isApprovedForAll(owner, operator).call(gas);
            log('isApproved?', res);
            return res;
        } catch(ex){
            console.error('Approval error', ex)
            return false;
        }
        return false;
    }

    async approve(collection, operator) {
        log('Approving operator...');
        log('Collection ', collection);
        log('Operator   ', operator);
        log('Token Owner', this.account);

        try {
            //let gas = { gasPrice: hex(this.config.gasprice), gasLimit: hex(this.config.gaslimit), from: this.account };
            let gas = { gasPrice: this.config.gasprice, gasLimit: this.config.gaslimit, from: this.account };
            let ctr = this.harmony.contracts.createContract(Token1155.abi, collection);
            let res = await ctr.methods.setApprovalForAll(operator, true).send(gas);
            //console.warn('RES', res);
            let txid = null;
            if(res?.transaction?.txStatus == 'REJECTED') { 
                txid = res?.transaction?.id || '0x0';
                log('Rejected tx', txid);
                return {error:'Approval rejected', txid:txid};
            } else if (res?.transaction?.txStatus == 'CONFIRMED') {
                txid = res?.transaction?.id || '0x0';
                log('Approved tx', txid);
                return {status:'SUCCESS', txid:txid};
            } else { 
                return {error: 'Unknown status: '+(res?.transaction?.txStatus || 'Unknown')};
            }
        } catch(ex){ 
            console.error('Approval error:', ex) ;
            return {error: ex.message||ex};
        }
        return {error: 'Approval error unknown'};
    }
    
    async buy(address, owner) {
        log('Buying artwork, please wait...');
        if(!this.account){ log('Wallet not connected'); return; }
        let res = await fetch(this.server+'/api/artwork/'+address);
        let nft = await res.json();
        if(!nft){ log('Artwork not found'); return; }
        if(nft.error){ log('Error getting artwork info'); return; }
        //console.log('Artwork', nft);
        log('Artwork', nft.artid, nft.name);
        let seller = nft.owner;
        let buyer  = this.account;
        log('Seller', seller);
        log('Buyer ', buyer);

        if(seller==buyer){ 
            log('You are the owner, can not buy this token');
            return;
        }
        if(!nft.onsale){
            log('Token not for sale');
            return;
        }
        if(nft.copies<1){
            log('No more copies available');
            return;
        }
        log('Confirming sale, please wait...');

        try {
            let url   = this.server+'/api/orderbyartwork/'+nft.address;
            let res   = await fetch(url);
            let order = await res.json();
            //console.warn('Order', order);
            if(!order){ 
                log('Sell order not created by owner yet');
                return;
            }
            let orderId = order.address;
            log('OrderId', orderId);

            // Check approval
            let approved = await this.isApproved(nft.collection, seller, this.proxy);
            if(!approved) { 
                log('Order has not been approved by seller');
                return;
            }

            let wei, gas, ctr, jsn, txid, ok;
            log('Sending payment, please wait...');
            wei = new this.harmony.utils.Unit(nft.saleprice).asOne().toWei();
            gas = { gasPrice: this.config.gasprice, gasLimit: this.config.gaslimit, value: wei, from: this.account };
            //console.log('Gas', gas);
            //log('Wei', wei.toString());
            ctr = this.harmony.contracts.createContract(Market.abi, this.market);
            res = await ctr.methods.buy(orderId, buyer, 1).send(gas);
            //console.warn('Response', res);
            //console.warn('Tx', res?.transaction);
            console.warn('Response', res?.transaction?.txStatus);
            ok = false;
            if (res.transaction.txStatus == 'REJECTED') { ok = false; }
            else if (res.transaction.txStatus == 'CONFIRMED') { ok = true; }
            else {
                log('Unknown status: '+res.transaction.txStatus);
                return;
            }
            txid = res?.transaction?.id;
            log('OK', ok, txid);

            if(ok) {
                // Add token copies to owners table
                // Davinci.api.buy(orderid, buyer, tokenid, qty)
                var data = {
                    address    : nft.address,
                    collection : nft.collection,
                    tokenid    : nft.tokenid,
                    tokentype  : nft.type,
                    seller     : seller,
                    ownerid    : buyer,
                    copies     : 1,
                    total      : nft.copies,
                    available  : 1,
                    onsale     : false,
                    saletype   : 0,
                    saleprice  : nft.saleprice,
                    updateqty  : true
                };
                //console.log('Data', data);

                if(nft.copies==1){
                    log('Change owner from', seller, 'to', buyer);
                    res = await fetch(this.server+'/api/changeowner', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(data)});
                    jsn = await res.json();
                    //console.warn('Response', jsn);
                    if(jsn.error) { 
                        console.warn('Change owner error: ', jsn.error); 
                    } else {
                        console.warn('Ownership transfered', jsn);
                    }
                }
                
                try {
                    console.warn('Save new owner', buyer);
                    res = await fetch(this.server+'/api/saveowner', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(data)});
                    jsn = await res.json();
                    //console.warn('Response', jsn);
                    if(jsn.error) { 
                        console.warn('Save owner error: ', jsn.error); 
                    } else {
                        console.warn('Ownership saved');
                    }
                } catch(ex1){
                    console.warn('Error saving owner', ex1);
                }

                // Save Transfer
                try {
                    console.warn('Saving transfer...', nft.address);
                    var xfer = {
                        txhash     : txid,
                        orderid    : orderId,
                        sender     : seller,
                        receiver   : buyer,
                        tokentype  : nft.type,
                        collection : nft.collection,
                        tokenid    : nft.tokenid,
                        value      : nft.saleprice,
                        artwork    : nft.address
                    };
                    //console.log('Xfer', xfer);

                    res = await fetch(this.server+'/api/transfer', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(xfer)});
                    jsn = await res.json();
                    //console.warn('Xfer response', jsn);
                    if(jsn.error) { 
                        console.warn('Transfer error: ', jsn); 
                    } else {
                        console.warn('Token transferred');
                    }
                } catch(ex2){
                    console.warn('Error saving transfer', ex2);
                }

                log('Sale completed!');
                return {status:'SUCCESS'};
            } else {
                log('Error in buy order');
                ctr.methods.buy(orderId, buyer, 1).call().then().catch(revertReason => {
                    console.error(revertReason);
                    if(revertReason.revert){
                        log('Error in buy order: '+revertReason.revert);
                    }
                });
                return;
            }
        } catch(ex){ 
            console.warn('Contract error:', ex);
            return;
        }
        log('Buy Token: Unknown error?');
    }

/*
    async sell(address){
        let res, inf;
        log('Creating sell order, please wait...');
        try {
            res = await fetch(this.server+'/api/neworder/'+address, {method:'GET', headers:{cookie:'user='+this.account}});
            inf = await res.json();
            console.warn('Order Response', inf);
        } catch(ex) {
            console.error('Order error', ex);
        }
        return inf;
    }

    async newAuction(address){
        let res, inf;
        log('Creating auction, please wait...');
        try {
            res = await fetch(this.server+'/api/newauction/'+address, {method: 'GET', headers:{cookie:'user='+this.account}});
            inf = await res.json();
            console.warn('Auction Response', inf);
        } catch(ex) {
            console.error('Auction error', ex);
        }
        return inf;
    }
*/

    async explore(limit=100, page=0){
        let url, opt, res, inf;
        log('Fetching NFTs, please wait...');
        try {
            url = this.server+'/api/explore?'+queryParams({limit,page});
            opt = {method: 'GET'};
            res = await fetch(url, opt);
            inf = await res.json();
            //console.warn('Explore response', inf);
        } catch(ex) {
            console.error('Explore error', ex);
        }
        return inf;
    }

    async creations(user, limit=100){
        let url, opt, res, inf;
        log('Fetching NFTs, please wait...');
        try {
            url = this.server+'/api/creations/'+user+'?limit='+limit;
            opt = {method: 'GET'}
            res = await fetch(url, opt);
            inf = await res.json();
            //console.warn('Explore response', inf);
        } catch(ex) {
            console.error('Explore error', ex);
        }
        return inf;
    }

    //bid
    //claim
    //renege
    //resell
    //profile
    //more...
}

module.exports = DaVinciSDK;
var global = global || {};
global.window = global.window || {};
global.window.DaVinciSDK = DaVinciSDK;

// END
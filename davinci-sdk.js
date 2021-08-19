// Davinci SDK
let { Harmony } = require('@harmony-js/core');
let fs          = require('fs');
let path        = require('path');
let crypto      = require('crypto'); 
let fetch       = require('node-fetch');
let FormData    = require('form-data');
let Token1155   = require('./token1155.json');

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

class DavinciSDK {
	version  = '2.0.0';
	network  = 2; // 1.mainnet 2.testnet
	urlmain  = 'https://api.s0.t.hmny.io';
	urltest  = 'https://api.s0.b.hmny.io';
	srvmain  = 'https://davinci.gallery';
	srvtest  = 'https://testnet.davinci.gallery';
	//srvtest  = 'http://localhost:5000';
	apimain  = 'https://davinci.gallery/api/v2';
	apitest  = 'https://testnet.davinci.gallery/api/v2';
	gateway  = 'https://ipfs.io/ipfs/';
    harmony  = null;
    gasprice = 3000000000;
    gaslimit =    1000000;

    collection = null;
    collectionMainnet = {
		image : '0x1548c6227cbd78e51eb0a679c1f329b9a5a99beb',
		model : '0x4F1e81F6736b04a75E6A552A30Aa32787566C84d',
		music : '0xbde650853b535d738ce67f1bdeb335e38834a9e9',
		video : '0x474d8fd12780fbe2b7b7bd74eb326bb75ded91d8',
		book  : '0x51f6290510be3c802471e27f0843a3a54a8226df'
    };
    collectionTestnet = {
		image : '0xb7d284f72d3383363eedbeeea9a217e24b265c4b',
		model : '0xa016572ca6d307f4020ea1316b9c29f313e90e5f',
		music : '0x1b0b37a0bef0b0815131d1405eb65916225cba48',
		video : '0x6104c92989f9a08840d2773bd8eb50315056e89b',
		book  : '0x76f97e5d6f1fb562baa94c6917d94a44de0b7987'
    };

    media = {
    	image : 'image',
    	model : 'model',
    	music : 'music',
    	video : 'video',
    	book  : 'book'
    }

	get netname() { return this.network==1?'Mainnet':'Testnet'; }
	get neturl()  { return this.network==1?this.urlmain:this.urltest; }
	get apiurl()  { return this.network==1?this.apimain:this.apitest; }
	get server()  { return this.network==1?this.srvmain:this.srvtest; }
	get wallet()  { return this.harmony.wallet.defaultSigner; }

	constructor(network=2) {
    	this.network = network;
    	this.collection = network==1?this.collectionMainnet:this.collectionTestnet;
		log('----', new Date());
    	log(`DaVinci SDK ${this.version} is ready in ${this.netname}`);
    }

    setNetwork(network=2) {
    	this.network = network;
    	log('SDK network changed to', this.netname);
    }

    newWallet(key) {
	    this.harmony = new Harmony(this.neturl, { chainType: 'hmy', chainId: this.network });
	    if(key){
	        let account = this.harmony.wallet.addByPrivateKey(key);
	        this.harmony.wallet.setSigner(account.address);
	    }
	    //log(this.harmony.wallet.defaultSigner);
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
			let res = await fetch(this.server + '/token/upload', {method: "POST", body: data});
			let rex = await res.json();
			console.warn('Res', rex);
			if(rex.error) { console.error(rex.error); return null; }
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
		    let gas    = { gasPrice: this.gasprice, gasLimit: 5000000, from: this.wallet };
			console.warn('Gas', gas);

	    	let arg = [name, symbol, this.wallet, uri, prefix];
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
		if(!this.wallet){ console.warn('Wallet not connected, please run sdk.newWallet(yourKey)'); return; }
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
			owner : this.wallet,
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
		return {address, hash, meta};
	}

	async mintToken(nft) {
	    log('Minting NFT...');
		try {
	        nft.fees = [];
	        if(nft.royalties>0){
	        	nft.fees = [[nft.creator, nft.royalties]];
	        }

		    let gas  = { gasPrice: this.gasprice, gasLimit: 5000000, from: this.wallet };
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
		if(!this.wallet){ console.warn('Wallet not connected, please run sdk.newWallet(yourKey)'); return; }

		// Validate input
		if(!nft.name){ console.warn('Token name is required'); return; }
		if(!nft.description){ console.warn('Token description is required'); return; }
		if(nft.saleprice<0){ console.warn('Token price is required'); return; }
		if(!nft.file){ console.warn('Token file is required'); return; }

		let address = await randomAddress();
		let now  = new Date();
		let day7 = addDays(now, 7);

		// Defaults
		nft.type       = '1155';
		nft.symbol     = 'VINCI';
		nft.creator    = this.wallet;
		nft.owner      = this.wallet;
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

	    if(nft.media!='image' && !nft.cover){ log('If NFT is not an image then cover must be provided (jpg or png)'); return; }

		// TODO: check collection owner

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

		//TODO: Charge minting fees

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
				rey = await fetch(this.server+'/api/neworder/'+nft.address, {method:'GET', headers:{cookie:'user='+this.wallet}});
				rez = await rey.json();
				console.warn('Order Response', rez);
			} else if(nft.saletype==1){ // Auction
				log('Creating auction order, please wait...');
				rey = await fetch(this.server+'/api/newauction/'+nft.address, {method: 'GET', headers:{cookie:'user='+this.wallet}});
				rez = await rey.json();
				console.warn('Auction Response', rez);
			}
		}
		log('SUCCESS!');
		log('Check your new NFT', this.server+'/view/'+nft.address);

		return {address:nft.address, hash:hash, meta:mhash};
	}

	//approve
	//sell
	//auction
	//resell
	//buy
	//bid
	//claim
	//renege
	//explore
	//mycreations
	//mycollection
	//more...
}

module.exports = DavinciSDK;

// END
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
		file       : './anyimg.jpg',   // absolute or relative path to image
	};

	let info = await sdk.createNFT(data);
	console.log('New token', info);
}

main();
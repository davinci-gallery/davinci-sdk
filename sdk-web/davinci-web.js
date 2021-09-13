// DaVinciWeb SDK Min

let crypto = window.crypto.subtle;

let Token1155 = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "contractURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tokenURIPrefix",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "bps",
          "type": "uint256[]"
        }
      ],
      "name": "SecondarySaleFees",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "SignerAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "SignerRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_owners",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "creators",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fees",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getFeeBps",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getFeeRecipients",
      "outputs": [
        {
          "internalType": "address payable[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isSigner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceSigner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "_ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "contractURI",
          "type": "string"
        }
      ],
      "name": "setContractURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "tokenURIPrefix",
          "type": "string"
        }
      ],
      "name": "setTokenURIPrefix",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenURIPrefix",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addSigner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeSigner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "internalType": "struct ERC1155Base.Fee[]",
          "name": "fees",
          "type": "tuple[]"
        },
        {
          "internalType": "uint256",
          "name": "supply",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "uri",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};

let Market = {
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "qty",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "payment",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        }
      ],
      "name": "logSale",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "buyerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sellerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transferProxy",
      "outputs": [
        {
          "internalType": "contract TransferProxy",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "enum Market3.TokenType",
          "name": "tokenType",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "enddate",
          "type": "uint256"
        }
      ],
      "name": "newOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getOrder",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "orderId",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "enum Market3.TokenType",
              "name": "tokenType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "royalties",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "beneficiary",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "enddate",
              "type": "uint256"
            },
            {
              "internalType": "enum Market3.OrderState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Market3.Order",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "enddate",
          "type": "uint256"
        }
      ],
      "name": "modOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "closeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "removeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "qty",
          "type": "uint256"
        }
      ],
      "name": "buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOperator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "any",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTreasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "any",
          "type": "address"
        }
      ],
      "name": "setTreasury",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSellerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setSellerFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBuyerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setBuyerFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransferProxy",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract TransferProxy",
          "name": "proxy",
          "type": "address"
        }
      ],
      "name": "setTransferProxy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gulp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};

let Auction = {
  "contractName": "auction",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logBid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logCancel",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logClaim",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logClose",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logForfeit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logInvalid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logModify",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logOrder",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "logRemove",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "buyerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sellerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transferProxy",
      "outputs": [
        {
          "internalType": "contract TransferProxy",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "enum Auctions.TokenType",
          "name": "tokenType",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserve",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "endtime",
          "type": "uint256"
        }
      ],
      "name": "newOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getOrder",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "orderId",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "enum Auctions.TokenType",
              "name": "tokenType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "collection",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fees",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "royalties",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "beneficiary",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "reserve",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastbid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endtime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
            },
            {
              "internalType": "enum Auctions.OrderState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Auctions.Order",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserve",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "royalties",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "endtime",
          "type": "uint256"
        }
      ],
      "name": "modifyOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "closeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "invalidOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "removeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getBid",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "bidder",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "enum Auctions.BidState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Auctions.Bid",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getLastBid",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "bidder",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "enum Auctions.BidState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Auctions.Bid",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getLastValidBid",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "bidder",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "enum Auctions.BidState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Auctions.Bid",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getLastValidIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "getBids",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "bidder",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "enum Auctions.BidState",
              "name": "state",
              "type": "uint8"
            }
          ],
          "internalType": "struct Auctions.Bid[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "placeBid",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "forfeit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "orderId",
          "type": "address"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOperator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "any",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTreasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "any",
          "type": "address"
        }
      ],
      "name": "setTreasury",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSellerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setSellerFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBuyerFees",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "setBuyerFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransferProxy",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract TransferProxy",
          "name": "proxy",
          "type": "address"
        }
      ],
      "name": "setTransferProxy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gulp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};


//-- WALLET

let web3 = null;

async function onConnect(info) {
	console.log('onConnect', info);
	// info.chainId
	window.DaVinciSDK.setNetwork(info.chainId);
	//loadWallet();
}

async function onDisconnect(info) {
	console.log('onDisconnect', info)
	if(window.DaVinciSDK.wallet.isOneWallet){ window.DaVinciSDK.wallet.forgetIdentity(); }
	console.log('Disconnected')
}

async function onAccounts(info) {
	console.log('onAccounts', info)
	window.DaVinciSDK.accounts = info;
	window.DaVinciSDK.myaccount = info[0];
	console.log('My account', window.DaVinciSDK.myaccount);
	window.DaVinciSDK.getBalance(window.DaVinciSDK.myaccount);
}

async function onChain(chainId) {
	console.log('onChain', chainId)
	if(chainId==window.DaVinciSDK.chainId) { console.log('Already on chain', chainId); return; }
	window.DaVinciSDK.setNetwork(chainId);
	window.DaVinciSDK.loadWallet();
	//requestAccount();
	//getAccounts();
}

async function onMessage(info) {
	console.log('onMessage', info)
}

class Wallet {
	MAINURL   = 'https://api.s0.t.hmny.io/';
	TESTURL   = 'https://api.s0.b.hmny.io/';
	TESTEXP   = 'https://explorer.testnet.harmony.one';
	MAINEXP   = 'https://explorer.harmony.one';
	chainId   = 0x1;
	chainType = 'hmy';
	explorer  = null;
	extension = null;
	mainnet   = false;
	neturl    = null;
	network   = 'testnet';
	provider  = null;
	wallet    = null;
	_connected = false;

	constructor(kind, net) {
		let netxt = ['local','mainnet','testnet'][net] || 'local';
	    console.log('Wallet init', kind, netxt);
	    if(net < 0 || net > 2){ console.log('Invalid network id', net); console.log('0:local 1:mainnet 2:testnet'); return; }
	    this.chainId   = ['0x2', '0x1', '0x2'][net];
	    this.neturl    = [this.TESTURL, this.MAINURL, this.TESTURL][net];
	    this.network   = ['local','mainnet','testnet'][net];
	    this.mainnet   = net==1;
	    this.explorer  = net==1?this.MAINEXP:this.TESTEXP;
	    this.start(kind, net);
	}

	async start(kind, net) {
		if(kind=='metamask'){
			if(window.ethereum && window.ethereum.isMetaMask){
		    	console.log('Metamask is present');
	    		web3 = new Web3(window.ethereum);
		    	this.wallet = window.ethereum;
		    	this.wallet.getAccount = async function() {
		    		let accts = await web3.eth.getAccounts();
		    		if(accts.length>0) { return {address:accts[0].toLowerCase()}; }
		    		else { return {address:null}; }
		    	}
			 	this.setListeners();
			} else {
		    	console.log('Metamask not available');
		    }
		} else if(kind=='harmony') {
		    if (window.onewallet && window.onewallet.isOneWallet) {
		    	console.log('Harmony wallet is present')
			 	this.wallet = window.onewallet;
			 	this.wallet.isConnected = function(){ return this._connected; }
		    	this.extension = await new HarmonyJs.HarmonyExtension(this.wallet);
	        	//this.extension.provider  = new HarmonyNetwork.Provider(this.network).provider;
	        	//this.extension.messenger = new HarmonyNetwork.Messenger(this.extension.provider, HarmonyUtils.ChainType.Harmony, chain);
	        	this.extension.provider.url           = this.neturl;
	        	this.extension.messenger.chainId      = this.chainId;
	        	this.extension.messenger.Network_ID   = this.network;
	        	this.extension.setShardID(0);
	        	this.extension.wallet.messenger       = this.extension.messenger;
	        	this.extension.blockchain.messenger   = this.extension.messenger;
	        	this.extension.transactions.messenger = this.extension.messenger;
	        	this.extension.contracts.wallet       = this.extension.wallet;
			 	//this.setListeners();
			 	//this.setNetwork();
			 	//this.loadWallet();
			} else {
		    	console.log('Harmony Wallet not available');
		    }
		} else {
			console.log('Only Metamask and Harmony wallets are available right now');
		}
	}

	async setListeners() {
		this.wallet.on('connect', onConnect);
		this.wallet.on('disconnect', onDisconnect);
		this.wallet.on('accountsChanged', onAccounts);
		this.wallet.on('chainChanged', onChain);
		this.wallet.on('message', onMessage);
		console.log('Listeners set');
	}

	async setNetwork(chainId) {
		if(!chainId){ chainId = this.wallet.chainId; }
		this.mainnet  = (chainId == 1);
		this.network  = this.mainnet ? 'mainnet' : 'testnet';
		this.neturl   = this.mainnet ? this.MAINURL : this.TESTURL;
		this.explorer = this.mainnet ? this.MAINEXP : this.TESTEXP;
		this.chainId  = chainId;
		console.log('Network', this.network, this.chainId);
	}

	async loadWallet() {
		console.log('Loading wallet...', this.network);
		//web3 = new Web3(this.neturl);
		//web3.eth.getChainId().then(id => { console.log('ChainId', id) })
		//console.log('WEB3', web3);
		//console.log('VER', web3.version)

	    if (this.wallet) {
		 	if(this.wallet.isConnected()) { 
		 		console.log('Already connected to', this.wallet.chainId==0x1?'MAINNET':'TESTNET', this.wallet.chainId); 
				getAccounts();
				//getAddress();
				//getBalance();
		 	} else {
		 		connect();
		 		console.log('Connecting...')
		 		if(this.wallet.isMetaMask){
					this.wallet.enable().then((err, accts) => { 
						console.log('Enabled', err, accts)
						getAccounts();
						//getAddress();
						//getBalance();
					});
		 		} else {
		 			let act = await this.wallet.getAccount();
		 			if(act){ 
		 				this.wallet._connected = true; 
		 				this.address = act.address;
		 				//document.cookie = 'user='+addressToHex(act.address).toLowerCase();
		 				setCookie('user', addressToHex(act.address).toLowerCase());
		 			}
			 		console.log('Account:', act);
		 		}
			}
	    } else {
	    	console.log('Wallet not available')
	    }
	}


	// Wallet Events
	async connect(wallet) {
	    if (this.wallet) {
	 		console.log('Connecting...')
	 		//if(this.wallet.isMetaMask){
	 		if(wallet=='metamask'){
	 			try {
					//let accts = await this.wallet.enable();
					//console.log('Enabled', accts)
					//this.address = accts[0];
					this.address = await this.getAccounts();
					this.addrexx = this.address.toLowerCase(); // hex
		 			//console.log('Account:', this.address);
	 				setCookie('user', this.addrexx);
	 				setCookie('wallet', 'metamask');
				} catch(ex) {
					console.error('Metamask error', ex);
	 			}
	 		} else {
	 			let act = await this.wallet.getAccount();
	 			if(act){ 
	 				this.wallet._connected = true; 
	 				this.address = act.address; // one
	 				this.addrexx = addressToHex(act.address).toLowerCase(); // hex
	 				setCookie('user', this.addrexx);
	 				setCookie('wallet', 'harmony');
	 			}
		 		console.log('Account:', act);
	 		}
	    } else {
	    	console.log('Wallet not available')
	    }
	}

	async reconnect() {
		try {
			const permissions = await this.wallet.request({
				method: 'wallet_requestPermissions',
	  			params: [{
	    			eth_accounts: {},
	  			}]
			});
		} catch(ex) {
			console.error('Error:', ex.message);
		}
	}

	async disconnect() {
	    if (this.wallet) {
	 		console.log('Disconnecting...')
	 		if(this.wallet.isMetaMask){
	 			console.log('Nothing to do');
	 			this.address = ''; 
	 		} else {
	 			let ok = await this.wallet.forgetIdentity();
	 			if(ok){ this.wallet._connected = false; this.address = ''; }
	 		}
			setCookie('wallet', '');
		 	console.log('Disconnected');
	    } else {
	    	console.log('Wallet not available')
	    }
	}

	// Methods
	async getAccounts() {
		try {
			let accts = await this.wallet.request({method: 'eth_requestAccounts'});
			this.accounts = accts;
			console.log('Accounts', accts)
			return accts[0];
		} catch(ex) {
			console.log('Error: User rejected'); 
			console.error('Error', err);
			//$('wallet').innerHTML = 'User rejected connection'; 
		}
	}

	async getAddress() {
		if(this.isMetaMask){
			this.myaccount = this.wallet.selectedAddress;
			console.log('Account', this.myaccount);
			//$('user-address').innerHTML = 'Address: '+this.myaccount.substr(0,10); 
			//callback(this.myaccount);
		} else {
			console.log('Get accounts...');
			this.wallet.request({method: 'eth_requestAccounts'}).then(res=>{
				console.log('Account', res);
				this.myaccount = res[0];
				//$('user-address').innerHTML = 'Address: '+this.myaccount.substr(0,10); 
				//callback(this.myaccount)
			}).catch(err => { 
				console.log('Error: Wallet not connected'); 
				console.error('Error', err) 
				//$('user-address').innerHTML = 'Wallet not connected'; 
				//$('user-balance').innerHTML = 'Balance: 0.0000 BNB'; 
				//callback(null);
			});
		}
	}

	async getBalance(adr) {
		console.log('Get balance...', adr);
		let res, bal;
		if(this.wallet.isMetaMask){
			try {
				res = await web3.eth.getBalance(adr);
				console.log('Balance', adr.substr(0,8), res);
				//bal = (parseInt(res)/10**18).toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 4, maximumFractionDigits: 4});
				bal = (parseInt(res)/10**18);
				//$('user-address').innerHTML = 'Address: '+adr.substr(0,10); 
		    	//$('user-balance').innerHTML = 'Balance: '+bal+' BNB';
			} catch(ex) {
				console.log('Metamask error', ex)
				bal = 0.0;
			}
		} else {
			try {
				res = await Harmony.blockchain.getBalance({address:adr});
				console.log('Balance', adr.substr(0,8), res.result);
				//bal = (parseInt(res.result)/10**18).toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 4, maximumFractionDigits: 4});
				bal = (parseInt(res.result)/10**18);
				//$('user-address').innerHTML = 'Address: '+adr.substr(0,10); 
		    	//$('user-balance').innerHTML = 'Balance: '+bal+' BNB';
			} catch(ex) {
				console.log('Harmony error', ex)
				bal = 0.0;
			}
		}
		return bal;
	}

	async getTokenBalance(token, address){
	    console.log('Token Balance of', Davinci.address);
		let gas, ctr, res, bal;
		let gpr = await this.getGasPrice();
		try {
	    	gas = { gasPrice: gpr, gasLimit: 1000000 };
		    ctr = await this.contract(HRC20.abi, token);
		    res = await ctr.methods.balanceOf(address).call(gas);
		    console.log('Balance', res.toString());
		    bal = parseFloat(res.toString())/10**18;
		    console.log('Token Balance', bal);
		} catch(ex) {
		    console.error('Error getting token balance', ex);
		}
		return bal;
	}

	async getGasPrice() {
	    //let gas = await web3.eth.getGasPrice();
	    let res = await Harmony.blockchain.gasPrice();
	    let gas = res.result || 10000000000;
	    console.log('Average gas price:', gas, parseInt(gas,16));
	    return gas;
	}

	async waitForReceipt(hash, n=0) {
		try {
			let receipt = await web3.eth.getTransactionReceipt(hash);
			console.log('Receipt', receipt);
		    if (receipt !== null) {
		        return receipt.transactionHash;
		    } else {
		    	//if(n>5){ console.log('Confirmation timeout'); }
		        //else { setTimeout(function(){ this.waitForReceipt(hash, callback, n++); }, 2000); }
		        return null;
		    }
		} catch (ex) {
			console.error('Error in receipt', ex);
		}
		return null;
	}


	async contract(abi, address) {
		let ctr;
		if(this.wallet.isMetaMask){
			console.log('Metamask contract...');
		    if(address){
				ctr = await new web3.eth.Contract(abi, address);
		    } else {
				ctr = await new web3.eth.Contract(abi);
		    }
			//console.log('Metamask contract', ctr);
			return ctr;
		} else {
			console.log('Harmony contract...');
		    if(address){
				ctr = Harmony.contracts.createContract(abi, address);
		    } else {
				ctr = Harmony.contracts.createContract(abi);
			}
			//console.log('Harmony contract', ctr);
			return ctr;
		}
	}
}


//-- UTILS

function log(...args) { console.log(args.join(' ')); }

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

function addressToOne(address) {
    if(address.startsWith('0x')){
        return (HarmonyJs.Harmony()).crypto.getAddress(address).bech32.toLowerCase();
    }
    return address.toLowerCase();
}

function addressToHex(address) {
    if(address.startsWith('one')){
        return (HarmonyJs.Harmony()).crypto.getAddress(address).checksum.toLowerCase();
    }
    return address.toLowerCase();
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let value = null;
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
    if (c.indexOf(nameEQ) == 0) { value = c.substring(nameEQ.length, c.length); break; }
  }
  return value;
}

function queryParams(obj){
    return (new URLSearchParams(obj)).toString();
}


/*
signature = r+s+hex(v)
sdk.harmony.crypto.recoverAddress(msg,sgn)
sdk.harmony.crypto.recoverPublicKey(msg,sgn)
sdk.harmony.crypto.verifySignature(msg,sgn)

function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
function toByteArray(hexString) {
  var result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return result;
}
*/

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

    wallet = null;

    walletType = {
        metamask : 'metamask',
        harmony  : 'harmony'
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
        if(!HarmonyJs){ log('DaVinciSDK-web needs HarmonyJs library to run'); return; }
        this.harmony = new HarmonyJs.Harmony(this.neturl, { chainType: 'hmy', chainId: this.chainid });
        this.collection = this.config[this.netname].collections;
        log('--', new Date());
        log(`DaVinci SDK ${this.version} is ready in ${this.netname}`);
        let inBrowser = (typeof(navigator)!=='undefined');
        log('In browser?', inBrowser);
        if(!inBrowser){ log('DaVinciSDK-web must run in a browser script'); return; }
    }

    setNetwork(network=2) {
        this.network = network;
        log('SDK network changed to', this.netname);
    }

    //setAccount(key) {
    //    if(key){
    //        let account = this.harmony.wallet.addByPrivateKey(key);
    //        this.harmony.wallet.setSigner(account.address);
    //    }
    //}

    async newWallet(kind){
        this.wallet = new Wallet(kind, this.network);
        await this.wallet.connect(kind);
        console.log('Address', this.wallet.address);
        this.harmony.wallet.setSigner(addressToHex(this.wallet.address));
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
        let res = await fetch(this.server+'/api/artwork/'+address, {method:'get', mode: 'no-cors'});
        console.log('res',res);
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
            ctr.wallet = this.wallet.wallet;
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
    //explore
    //mycreations
    //mycollection
    //profile
    //more...
}


// END
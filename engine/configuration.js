/* 
       ___  ___    _  _  ___  _____   __  __             _         _   
 _ _  |_  )|   \  | \| || __||_   _| |  \/  | __ _  _ _ | |__ ___ | |_ 
| ' \  / / | |) | | .` || _|   | |   | |\/| |/ _` || '_|| / // -_)|  _|
|_||_|/___||___/  |_|\_||_|    |_|   |_|  |_|\__,_||_|  |_\_\\___| \__|
                                                                    
Update values accordingly
xxnft is the NFT Creator Contract Address
xxmarket is the NFT MarketPlace Contract Address to sell created nfts.
xxresell is the NFT MarketResell Contract Address for existing nfts.
xxnftcol is the existing NFT Collection Address
*/

/*
Private Key Encryption
Replace ethraw with your private key "0xPRIVATEKEY" (Ethereum and other EVM)
Replace hhraw with your private key "0xPRIVATEKEY" (Hardhat)
*/
import SimpleCrypto from "simple-crypto-js"
const cipherKey = "#ffg3$dvcv4rtkljjkh38dfkhhjgt"
const ethraw = "0x8207b7bbf486039b455923a402560ed041ad4b7243e9f329d6e415c00aaa9ef2";
const hhraw = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const simpleCrypto = new SimpleCrypto(cipherKey)
export const cipherEth = simpleCrypto.encrypt(ethraw)
export const cipherHH = simpleCrypto.encrypt(hhraw)

/*
IPFS API DETAILS
*/
import { create as ipfsHttpClient } from 'ipfs-http-client';
export const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

/*
HardHat Testnet
*/
export var hhresell = "0x7ef8E99980Da5bcEDcF7C10f41E55f759F6A174B";
export var hhnftcol = "0x9bAaB117304f7D6517048e371025dB8f89a8DbE5";
export var hhnft = "0xd9145CCE52D386f254917e481eB44e9943F39138";
export var hhmarket = "0x31A65C6d4EB07ad51E7afc890aC3b7bE84dF2Ead";
export var hhrpc = "http://localhost:8545";

export var mainnet = hhrpc;

/*
Goerli Testnet
*/
export var goeresell = "YOUR CONTRACT ADDRESS";
export var goenftcol = "YOUR CONTRACT ADDRESS";
export var goenft = "YOUR CONTRACT ADDRESS";
export var goemarket = "YOUR CONTRACT ADDRESS";
export var goerpc = "https://rpc.ankr.com/eth_goerli";

/*
BSC Testnet
*/
export var bsctresell = "YOUR CONTRACT ADDRESS";
export var bsctnftcol = "YOUR CONTRACT ADDRESS";
export var bsctnft = "YOUR CONTRACT ADDRESS";
export var bsctmarket = "YOUR CONTRACT ADDRESS";
export var bsctrpc = "https://data-seed-prebsc-2-s3.binance.org:8545";

/*
Mumbai Testnet
*/
export var mmresell = "YOUR CONTRACT ADDRESS";
export var mmnftcol = "YOUR CONTRACT ADDRESS";
export var mmnft = "YOUR CONTRACT ADDRESS";
export var mmmarket = "0x64D44367500C6EEaF853B1C527C6274357989243";
export var mmrpc = "https://polygon-mumbai.g.alchemy.com/v2/_N2T74yygUy1yEG7v2B_mbU2ML1bKWW9";

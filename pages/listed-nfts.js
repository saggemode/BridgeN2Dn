import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Resell from "../engine/Resell.json";
import NFTCollection from "../engine/NFTCollection.json";
import {
  Card,
  Button,
  Input,
  Col,
  Row,
  Spacer,
  Container,
  Text,
  Grid,
} from "@nextui-org/react";
import axios from "axios";
import "sf-font";
import Web3 from "web3";
import {
  hhresell,
  hhnftcol,
  mainnet,
  cipherHH,
  simpleCrypto,
} from "../engine/configuration";
import { Layout } from "../components";

const Sell = () => {
  const [user, getUser] = useState([]);
  const [resalePrice, updateresalePrice] = useState({ price: "" });
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    connectUser();
    getWalletNFTs();
  }, [setNfts, getUser]);
  const router = useRouter();

  async function connectUser() {
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
    }
    getUser(account);
  }

  async function getWalletNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(mainnet);
    const key = simpleCrypto.decrypt(cipherHH);
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(hhnftcol, NFTCollection, wallet);
    const itemArray = [];
    contract.totalSupply().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        });
        getUri.then((value) => {
          let rawImg = value.data.image;
          var name = value.data.name;
          var desc = value.data.description;
          let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
          Promise.resolve(owner).then((value) => {
            let ownerW = value;
            let meta = {
              name: name,
              img: image,
              tokenId: token,
              wallet: ownerW,
              desc,
            };
            console.log(meta);
            itemArray.push(meta);
          });
        });
      }
    });
    await new Promise((r) => setTimeout(r, 3000));
    setNfts(itemArray);
    setLoadingState("loaded");
  }

 

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No NFTs Listed for Sale!
        </h1>
      </div>
    );
  }
  return (
    <Layout>
      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div className="w-full minmd:w-4/5 pt-65">
          <div className="mt-4">
            <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
              Listed NFTs for Sale
            </h2>
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {/* {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)} */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sell;

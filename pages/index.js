import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Grid, Card, Text, Button, Row, Spacer, Container } from '@nextui-org/react';
import { NFTContext } from "../context/NFTContext";
import {
  Banner,
  CreatorCard,
  Layout,
  Loader,
  NFTCard,
  SearchBar,
} from "../components";

import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import NFTCollection from "../engine/NFTCollection.json";
import Resell from "../engine/Resell.json";
import Market from "../engine/Market.json";
import NFT from "../engine/NFT.json";

import {
  hhnft,
  hhmarket,
  hhresell,
  hhnftcol,
  mainnet,
} from "../engine/configuration";
import { cipherHH, simpleCrypto } from "../engine/configuration";
import confetti from "canvas-confetti";
import "sf-font";

import images from "../assets";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shortenAddress";

const Home = () => {
  const [hhlist, hhResellNfts] = useState([]);
  const [hhnfts, hhsetNfts] = useState([]);

  useEffect(() => {
    // loadHardHatResell()
    loadNewSaleNFTs();
  }, [hhResellNfts, hhsetNfts]);

  async function loadNewSaleNFTs() {
    const hhPrivkey = simpleCrypto.decrypt(cipherHH);
    const provider = new ethers.providers.JsonRpcProvider(mainnet);
    const wallet = new ethers.Wallet(hhPrivkey, provider);
    const tokenContract = new ethers.Contract(hhnft, NFT, wallet);
    const marketContract = new ethers.Contract(hhmarket, Market, wallet);
    const data = await marketContract.getAvailableNft();
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    hhsetNfts(items);
  }

  async function buyNewNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(hhmarket, Market, signer);
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.n2DMarketSale(hhnft, nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNewSaleNFTs();
  }

  return (
    <Layout>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <Banner
            name="NFT's are birth certificates for the offspring of creators."
            childStyles="md:text-4xl sm:text-2xl xs:text-xl text-center"
            parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          />

          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                Top Creators
              </h1>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Hot NFTs 🔥
                </h1>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              <Grid.Container gap={1} justify="flex-start">
          {
            hhnfts.slice(0, 4).map((nft, i) => (
              <Grid xs={3} key={i}>
                <Card style={{ marginRight: '3px', boxShadow: '1px 1px 10px #ffffff' }} variant="bordered" key={i}>
                  <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'SF Pro Display',
                    fontWeight: '200',
                    fontSize: '20px',
                    marginLeft: '3px'
                  }}>{nft.name}</Text>
                  <Card.Body css={{ p: 0}}>
                    <Card.Image
                      style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '6%' }}
                      src={nft.image}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text wrap="wrap">{nft.description}</Text>
                      <Text style={{ fontSize: '30px' }}>{nft.price}<img src='n2dr-logo.png' style={{ width: '60px', height: '25px', marginTop: '4px' }} /></Text>
                      <Button color="gradient" style={{ fontSize: '20px' }} onClick={() => handleConfetti(buyNewNft(nft))}>Buy</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))
          }
        </Grid.Container>
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

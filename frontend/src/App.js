import logo from "./logo.svg";
import { bn } from "fuels";
import { useWallet, useContract } from "fuels-react";
import { useId, useState } from "react";
import DisplaySingleEvent from "./DisplaySingleEvent";
import { Heading, Center, Button, Flex, Spacer, Box, Image } from '@chakra-ui/react';
import "./App.css";

function App() {

  const wallet = useWallet();
  // const block = useBlock({ idOrHeight: 900000 });
  const whitelistAbi = {
    types: [
      {
        typeId: 0,
        type: "b256",
        components: null,
        typeParameters: null,
      },
      {
        typeId: 1,
        type: "enum Identity",
        components: [
          {
            name: "Address",
            type: 4,
            typeArguments: null,
          },
          {
            name: "ContractId",
            type: 5,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 2,
        type: "enum InvalidRSVPError",
        components: [
          {
            name: "IncorrectAssetId",
            type: 5,
            typeArguments: null,
          },
          {
            name: "NotEnoughTokens",
            type: 7,
            typeArguments: null,
          },
          {
            name: "InvalidEventID",
            type: 1,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 3,
        type: "str[10]",
        components: null,
        typeParameters: null,
      },
      {
        typeId: 4,
        type: "struct Address",
        components: [
          {
            name: "value",
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 5,
        type: "struct ContractId",
        components: [
          {
            name: "value",
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 6,
        type: "struct RSVPList",
        components: [
          {
            name: "unique_id",
            type: 7,
            typeArguments: null,
          },
          {
            name: "max_capacity",
            type: 7,
            typeArguments: null,
          },
          {
            name: "deposit",
            type: 7,
            typeArguments: null,
          },
          {
            name: "owner",
            type: 1,
            typeArguments: null,
          },
          {
            name: "name",
            type: 3,
            typeArguments: null,
          },
          {
            name: "num_of_rsvps",
            type: 7,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 7,
        type: "u64",
        components: null,
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: "capacity",
            type: 7,
            typeArguments: null,
          },
          {
            name: "price",
            type: 7,
            typeArguments: null,
          },
          {
            name: "list_name",
            type: 3,
            typeArguments: null,
          },
        ],
        name: "create_list",
        output: {
          name: "",
          type: 6,
          typeArguments: null,
        },
        attributes: [
          {
            name: "storage",
            arguments: ["read", "write"],
          },
        ],
      },
      {
        inputs: [
          {
            name: "list_id",
            type: 7,
            typeArguments: null,
          },
        ],
        name: "rsvp",
        output: {
          name: "",
          type: 6,
          typeArguments: null,
        },
        attributes: [
          {
            name: "storage",
            arguments: ["read", "write"],
          },
        ],
      },
    ],
    loggedTypes: [
      {
        logId: 0,
        loggedType: {
          name: "",
          type: 2,
          typeArguments: [],
        },
      },
      {
        logId: 1,
        loggedType: {
          name: "",
          type: 2,
          typeArguments: [],
        },
      },
      {
        logId: 2,
        loggedType: {
          name: "",
          type: 2,
          typeArguments: [],
        },
      },
    ],
    messagesTypes: [],
    configurables: [],
  };
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [maxCap, setMaxCap] = useState(0);
  const [listCreation, setListCreation] = useState(false);
  const [rsvpConfirmed, setRSVPConfirmed] = useState(false);
  const [numOfRSVPs, setNumOfRSVPs] = useState(0);
  const [listId, setListId] = useState(0);
  const [listDeposit, setListDeposit] = useState(0);

  const contract = useContract({
    address:
      "0xa20edc3a1a76a2c67f453c9a26ebf870b14e3a562e8dad3efd225a5854a3e246",
    abi: whitelistAbi,
  });

  async function joinWhitelist() {
    setLoading(true);
    try {
      console.log("RSVPing to list");
      // Create a transaction to RSVP to the whitelist
      const { value: listRSVP, transactionId } = await contract.functions
        .rsvp(listId)
        .txParams({ gasPrice: 1, variableOutputs: 1 })
        .call();

      console.log(
        "Transaction created",
        transactionId,
        `https://fuellabs.github.io/block-explorer-v2/transaction/${transactionId}`
      );
      console.log("# of RSVPs", listRSVP.num_of_rsvps.toString());
      setNumOfRSVPs(listRSVP.num_of_rsvps.toNumber());
      setRSVPConfirmed(true);
      alert("rsvp successful");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Center className="container" color='white'></Center>
      <Center className="container_two"></Center>
      <Center className="container_three"></Center>
      <Flex className="connect_button_container">
        <Spacer />
        {wallet.isConnected ? (
          <Button className="fuel_network" size='md' onClick={wallet.disconnect}>Disconnect</Button>

        ) : (
          <Button className="fuel_network" size='md' onClick={wallet.connect}>Connect to Fuel Network</Button>
        )}

      </Flex>
      <Center>
        <Box>
          <Image src='https://64.media.tumblr.com/d0055df6c6dd31e331078a7f765a3b4b/tumblr_nmv1cg2lTg1qchtw3o1_400.gifv' alt='Dan Abramov' />
        </Box>
      </Center>
      <Center className="header_text">
        <Heading className="first_header" size='2xl'>
          Browse 90s Gifs
        </Heading>
        <Heading size='lg'>
          A retro search engine powered by AI.
        </Heading>
        <Button onClick={joinWhitelist} className="signup_button" colorScheme='purple' size='md'>
          Signup for Beta
        </Button>
      </Center>
    </>


  );
}

export default App;

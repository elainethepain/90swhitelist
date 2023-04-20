import logo from "./logo.svg";
import { bn } from "fuels";
import { useWallet, useContract } from "fuels-react";
import { useState } from "react";
import DisplaySingleEvent from "./DisplaySingleEvent";
import { Heading, Center, Text, Box } from '@chakra-ui/react';
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
  const [newListName, setNewListName] = useState("");
  const [newListMax, setNewListMax] = useState(0);
  const [newListDeposit, setNewListDeposit] = useState(0);
  const [newListID, setNewListID] = useState("");
  const [listCreation, setListCreation] = useState(false);
  const [newListRSVP, setnewListRSVP] = useState(0);

  const contract = useContract({
    address:
      "0xa20edc3a1a76a2c67f453c9a26ebf870b14e3a562e8dad3efd225a5854a3e246",
    abi: whitelistAbi,
  });


  return (
    <>
      <Center className="container" h='100px' color='white'>
        <Box>
          <Heading noOfLines={1}>
            Browse 90s Gifs
          </Heading>
          <Text>
            The Best Gifs Powered By AI.
          </Text>
        </Box>
      </Center>
    </>


  );
}

export default App;

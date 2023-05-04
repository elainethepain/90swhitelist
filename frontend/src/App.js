import logo from "./logo.svg";
import { useWallet, useContract } from "fuels-react";
import { useState } from "react";
import { whitelistAbi } from "./contracts/whitelistabi";
import { Heading, Center, Button, Flex, Spacer, Box, Image, Stack, Divider, Badge, Text } from '@chakra-ui/react';
import "./App.css";

function App() {

  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [rsvpConfirmed, setRSVPConfirmed] = useState(false);
  const [numOfRSVPs, setNumOfRSVPs] = useState(0);
  const [listId, setListId] = useState(0);


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
      <Flex className="nav_container">
        <h1 class="word_logo"><span data-text-fill="true" class="word_logo">
          90sAI
        </span>
        </h1>
        <Spacer />
        {wallet.isConnected ? (
          <Button className="fuel_network" size='md' onClick={wallet.disconnect}>Disconnect</Button>

        ) : (
          <Button className="fuel_network" size='md' onClick={wallet.connect}>Connect to Fuel Network</Button>
        )}

      </Flex>
      <Divider colorScheme="gray" className="divider" />
      <Center>
        <Stack className="stack_container" direction='row'>
          <Stack className="heading_stack_container" direction="column">
            <Badge variant='outline' fontSize="1em" mb="2" colorScheme='pink'>
              Coming Soon in 2023
            </Badge>
            <Heading className="first_header" size='2xl'>
              The Best Collection of 90s Gifs Ever.
            </Heading>
            <Heading className="second_header" size='lg'>
              A retro search engine powered by AI.
            </Heading>
            <Button onClick={joinWhitelist} className="signup_button" colorScheme='purple' size='md'>
              Signup for Beta
            </Button>
            <Box className="gif_header_2">
              <Image src='https://64.media.tumblr.com/d0055df6c6dd31e331078a7f765a3b4b/tumblr_nmv1cg2lTg1qchtw3o1_400.gifv' alt='Dan Abramov' />
            </Box>
          </Stack>
          <Box className="gif_header">
            <Image src='https://64.media.tumblr.com/d0055df6c6dd31e331078a7f765a3b4b/tumblr_nmv1cg2lTg1qchtw3o1_400.gifv' alt='Dan Abramov' />
          </Box>
        </Stack>
      </Center>

    </>


  );
}

export default App;

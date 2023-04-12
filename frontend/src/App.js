import logo from "./logo.svg";
import { bn } from "fuels";
import { useWallet, useContract } from "fuels-react";
import { useState } from "react";
import DisplaySingleEvent from "./DisplaySingleEvent";
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

  async function createList(e) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("creating whitelist");
      const requiredDeposit = bn.parseUnits(newListDeposit.toString());
      console.log("requiredDeposit", requiredDeposit.toString());
      const { value } = await contract.functions
        .create_list(newListMax, requiredDeposit, newListName)
        .txParams({ gasPrice: 1 })
        .call();

      console.log("return of create list", value);
      console.log(
        "deposit value",
        bn.parseUnits(newListDeposit.toString()).toString()
      );
      console.log("list name", value.name);
      console.log("list capacity", value.max_capacity.toString());
      console.log("listID", value.unique_id.toString());
      setNewListID(value.unique_id.toString());
      setListCreation(true);
      alert("List created");
    } catch (e) {
      alert(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="App">
      <div className="card">
        {wallet.isConnected ? (
          <button onClick={wallet.disconnect}>Disconnect</button>
        ) : (
          <button onClick={wallet.connect}>Connect</button>
        )}
        <p>
          Edit <code>src/App.tsx</code>
        </p>
        <form
          onSubmit={createList}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Create events, manage ticket sales, and connect with your
                  community.
                </p>
              </div>
            </div>
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
              <p className="text-lg font-bold">Create a New Event</p>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Event name
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="event-name"
                      id="event-name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="Enter event name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Max Capacity
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      value={newListMax}
                      onChange={(e) => setNewListMax(+e.target.value)}
                      type="number"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Ticket Price
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      value={newListDeposit}
                      onChange={(e) => setNewListDeposit(+e.target.value)}
                      id="email"
                      name="email"
                      type="number"
                      autoComplete="email"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>
          </div>
        </form>
        <div className="results">
          <div className="card rounded-sm mt-4">
            {listCreation && newListID !== "0" && (
              <>
                <DisplaySingleEvent
                  listName={newListName}
                  deposit={newListDeposit}
                  listId={newListID}
                  numOfRsvps={newListRSVP}
                ></DisplaySingleEvent>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

export const whitelistAbi = {
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
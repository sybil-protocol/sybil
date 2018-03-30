export default [
  {
    constant: false,
    inputs: [
      {
        name: "key",
        type: "string"
      },
      {
        name: "value",
        type: "string"
      }
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "subject",
        type: "address"
      },
      {
        name: "key",
        type: "string"
      }
    ],
    name: "get",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "",
        type: "address"
      },
      {
        indexed: false,
        name: "",
        type: "string"
      },
      {
        indexed: false,
        name: "",
        type: "string"
      }
    ],
    name: "AttributeUpdated",
    type: "event"
  }
];

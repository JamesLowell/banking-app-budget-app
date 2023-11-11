export const userList = [
    {
      firstName: "Alice",
      lastName: "Johnson",
      id: 1,
      address: {
        houseNumber: "123 Elm Street",
        city: "Montalban",
        province: "Rizal",
        country: "Philippines"
      },
      contactNumber: "(555) 555-1234",
      email: "alice@email.com",
      amount: 2500,
      transactionHistory: [
        {
          date: "2023-04-15",
          transaction: "Deposit",
          amount: 1000,
          receiver: null,
        },
        {
          date: "2023-04-18",
          transaction: "Withdrawal",
          amount: 300,
          receiver: null,
        },
        {
          date: "2023-04-20",
          transaction: "Transfer",
          amount: 200,
          receiver: "Bob",
        },
      ],
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      id: 2,
      address: {
        houseNumber: "456 Oak Avenue",
        city: "Montalban",
        province: "Rizal",
        country: "Philippines"
      },
      contactNumber: "(555) 555-5678",
      email: "bob@email.com",
      amount: 1800,
      transactionHistory: [
        {
          date: "2023-04-10",
          transaction: "Deposit",
          amount: 800,
          receiver: null,
        },
        {
          date: "2023-04-12",
          transaction: "Withdrawal",
          amount: 100,
          receiver: null,
        },
        {
          date: "2023-04-20",
          transaction: "Transfer",
          amount: 200,
          receiver: "Alice",
        },
      ],
    },
    {
      firstName: "Carol",
      lastName: "Brown",
      id: 3,
      address: {
        houseNumber: "456 Oak Avenue",
        city: "Montalban",
        province: "Rizal",
        country: "Philippines"
      },
      contactNumber: "(555) 555-8765",
      email: "carol@email.com",
      amount: 3000,
      transactionHistory: [],
    },
    {
      firstName: "David",
      lastName: "Lee",
      id: 5,
      address: {
        houseNumber: "456 Oak Avenue",
        city: "Montalban",
        province: "Rizal",
        country: "Philippines"
      },
      contactNumber: "(555) 555-2345",
      email: "david@email.com",
      amount: 2500,
      transactionHistory: [],
    },
    {
      firstName: "Emma",
      lastName: "Wilson",
      id: 4,
      address: {
        houseNumber: "456 Oak Avenue",
        city: "Montalban",
        province: "Rizal",
        country: "Philippines"
      },
      contactNumber: "(555) 555-7890",
      email: "emma@email.com",
      amount: 4000,
      transactionHistory: [
        {
          date: "2023-04-03",
          transaction: "Deposit",
          amount: 1200,
          receiver: null,
        },
        {
          date: "2023-04-08",
          transaction: "Withdrawal",
          amount: 500,
          receiver: null,
        },
        {
          date: "2023-04-15",
          transaction: "Transfer",
          amount: 300,
          receiver: "David",
        },
      ],
    },
  ];
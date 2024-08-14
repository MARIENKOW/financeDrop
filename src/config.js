const config = {
   SERVER_API: "http://192.168.1.101:5000",
   CLIENT_API: "http://192.168.1.101:3000",
   // SERVER_API: "http://localhost:5000",
   depositTypes: {
      1: "NFT Deposit",
      2: "Referral Deposit",
      3: "Other Deposit",
   },
   cashOutTypes: {
      1: "pending",
      2: "confirm",
      3: "reject",
   },
};

export default config;

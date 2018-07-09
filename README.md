# blockchain-crypto
Blockchain &amp; Cryptocurrency using Javascript/Node.js

Blockchain is a special - distributed and decentralized database ( financial ledger ) which stores data like transactions and that is publicly shared across all the nodes in its network.

I have developed a distributed and decentralized blockchain application, with secured GENISIS block and also implemented a functionality to add blocks of transactions, validate the blocks in blockchain and synchronize the chain over the network by providing p2p transport layer.
- Features:
  1. Used Javascript object-oriented programming style ( ES5-ES6).
  2. Hosted on http server using Express.js runing on Node.js. 
  3. Created Genisis block and generated hashes for blocks in the chain using crypto-js/sha256 module. Created an API around the      Blockchain
  4. Jest library is used to write Unit Test Components of the Blockchain.
  5. Used websocket (ws) to establish real-time peer-to-peer connection server.
  6. Implemented a proof-of-work algorithm before adding any block to the blockchain.

const Block = require("./models/block");
const Transaction = require("./models/transaction");
const Blockchain = require("./models/blockchain");

const genesisBlock = new Block();
const blockchain = new Blockchain(genesisBlock);

var transaction = new Transaction("Shubam", "Maurya", 100);
var block = blockchain.getNextBlock([transaction]);
blockchain.addBlock(block);

var transaction1 = new Transaction("Maurya", "Shubham", 100);
var transaction2 = new Transaction("Maurya", "Shubham", 100);
var transaction3 = new Transaction("Maurya", "Shubham", 100);
var transaction4 = new Transaction("Maurya", "Shubham", 100);
var block = blockchain.getNextBlock([
  transaction1,
  transaction2,
  transaction3,
  transaction4
]);
blockchain.addBlock(block);

console.log(blockchain);

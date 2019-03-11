const sha256 = require("sha256");

class Block {
  constructor(index, previousHash, timestamp, data) {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = calculateHash(index, previousHash, timestamp, data);
  }
}

const calculateHash = (index, previousHash, timestamp, data) => {
  const hash = sha256(index + previousHash + timestamp + data);
  return hash;
};

const genesisBlock = new Block(0, null, 1465154705, "my genesis block!!");

const BlockChain = [genesisBlock];

const getBlockchain = () => BlockChain;

const getLatestBlock = () => BlockChain[BlockChain.length - 1];

const generateNextBlock = blockData => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = new Date().getTime() / 1000;

  const newBlock = new Block(
    nextIndex,
    previousBlock.hash,
    nextTimestamp,
    blockData
  );

  addToBlockchain(newBlock);
  //broadcast here;

  return newBlock;
};

const isValidNewBlock = (newBlock, previousBlock) => {
  if (!isValidBlockStructure(newBlock)) {
    console.log("invalid structure");
    return false;
  }
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log("invalid index");
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log("invalid previoushash");
    return false;
  } else if (
    calculateHash(
      newBlock.index,
      previousBlock.hash,
      newBlock.timestamp,
      newBlock.data
    ) !== newBlock.hash
  ) {
    console.log(
      typeof newBlock.hash +
        " " +
        typeof calculateHash(
          newBlock.index,
          previousBlock.hash,
          newBlock.timestamp,
          newBlock.data
        )
    );
    console.log(
      "invalid hash: " +
        calculateHash(
          newBlock.index,
          previousBlock.hash,
          newBlock.timestamp,
          newBlock.data
        ) +
        " " +
        newBlock.hash
    );
    return false;
  }
  return true;
};

const isValidBlockStructure = block => {
  return (
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestamp === "number" &&
    typeof block.data === "string"
  );
};

const isValidChain = blockchainToValidate => {
  const isValidGenesis = block => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };

  if (!isValidGenesis(blockchainToValidate[0])) {
    return false;
  }
  for (let i = 1; i < blockchainToValidate.length; i++) {
    if (
      !isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])
    ) {
      return false;
    }
  }
  return true;
};

const addToBlockchain = block => {
  if (isValidNewBlock(block, getLatestBlock())) {
    BlockChain.push(block);
  }
};

const replaceChain = newBlocks => {
  if (isValidChain(newBlocks) && newBlocks.length > getBlockchain().length) {
    console.log(
      "Received blockchain is valid. Replacing current blockchain with received blockchain"
    );
    blockchain = newBlocks;
    broadcastLatest();
  } else {
    console.log("Received blockchain invalid");
  }
};

module.exports = {
  Block,
  BlockChain,
  getLatestBlock,
  getBlockchain,
  generateNextBlock,
  isValidBlockStructure,
  isValidChain,
  isValidNewBlock,
  addToBlockchain
};

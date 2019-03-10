const sha256 = require("sha256")

class Block {
  constructor(index, timestamp, data, prevHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash
    this.thisHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    )
  }
}

const createGenesisBlock = () => new Block(0, Date.now(), "Genesis Block", "0")

const nextBlock = (prevBlock, data) =>
  new Block(prevBlock.index+1, Date.now(), data, prevBlock.thisHash)

const createBlockChain = (num) => {
  const blockchain = [createGenesisBlock()]
  let prevBlock = blockchain[0]
  for (let index = 0; index < num; index++) {
    const blockToAdd = nextBlock(prevBlock, `This is block #${index}`)
    blockchain.push(blockToAdd)
    prevBlock = blockToAdd
  }

  console.log(blockchain)
}

const blockchainLength = 1000
createBlockChain(blockchainLength)

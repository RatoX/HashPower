/* eslint-disable
     class-methods-use-this,
     no-param-reassign,
     no-plusplus
*/
import SHA256 from 'crypto-js/sha256';

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    let toCalc = this.index + this.previousHash + this.timestamp;
    toCalc = toCalc + JSON.stringify(this.data) + this.nonce;

    return SHA256(toCalc).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log(this.hash, ' !== ', Array(difficulty + 1).join('0'), this.nonce);
    }

    return `BLOCK MINED: ${this.hash}`;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.UTC(2018, 2, 21, 0, 0, 0, 0), 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

export {
  Block,
  Blockchain,
};

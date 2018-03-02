import { Block } from '@/blockchain';

onmessage = (e) => {
  const blockData = e.data[0] || {};
  const { index, date, data, previousHash, minerDifficulty } = blockData;
  const block = new Block(index, date, data);

  block.previousHash = previousHash;
  block.hash = block.calculateHash();
  block.mineBlock(minerDifficulty);

  postMessage(block);
};

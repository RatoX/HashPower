import { Blockchain, Block } from '@/blockchain';

const getters = {
  blockchain: state => state.blockchain,
};

const mutations = {
  addBlock(state, { block }) {
    state.blockchain.addBlock(block);
  },

  startMining(state) {
    state.mining = true;
  },

  stopMining(state) {
    state.mining = false;
  },
};

const actions = {
  addBlock({ commit, state }, { data }) {
    const index = state.blockchain.chain.length;
    const date = new Date().toUTCString();
    const block = new Block(index, date, data);

    commit('startMining');

    return new Promise((resolve) => {
      block.previousHash = state.blockchain.getLatestBlock().hash;
      block.hash = block.calculateHash();
      block.mineBlock(state.minerDifficulty);

      commit('stopMining');

      resolve(block);
    });
  },
};

const state = {
  minerDifficulty: 2,
  mining: false,
  blockchain: new Blockchain(),
};

export default {
  state,
  getters,
  mutations,
  actions,
};

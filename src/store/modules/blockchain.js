/* eslint-disable
     no-console
*/
import { Blockchain } from '@/blockchain';
import MiningWorker from '@/workers/mining';

const getters = {
  blockchain: state => state.blockchain,
  mining: state => state.mining,
};

const mutations = {
  attachBlockOnChain(state, { block }) {
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
    commit('startMining');

    return new Promise((resolve) => {
      const index = state.blockchain.chain.length;
      const date = new Date().toUTCString();
      const worker = new MiningWorker();
      const previousHash = state.blockchain.getLatestBlock().hash;
      const minerDifficulty = state.minerDifficulty;

      worker.postMessage([{
        index,
        date,
        data,
        previousHash,
        minerDifficulty,
      }]);

      worker.addEventListener('message', (event) => {
        const block = event.data;

        commit('attachBlockOnChain', { block });
        resolve(block);
        commit('stopMining');
      });

      worker.addEventListener('error', (error) => {
        console.error(error);
      });
    });
  },
};

const state = {
  minerDifficulty: 3,
  mining: false,
  blockchain: new Blockchain(),
};

export default {
  state,
  getters,
  mutations,
  actions,
};

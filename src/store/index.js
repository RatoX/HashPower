import Vue from 'vue';
import Vuex from 'vuex';
import blockchain from './modules/blockchain';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    blockchain,
  },
});

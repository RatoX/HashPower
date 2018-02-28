import Vue from 'vue';
import Router from 'vue-router';
import BlockChain from '@/components/BlockChain';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BlockChain',
      component: BlockChain,
    },
  ],
});

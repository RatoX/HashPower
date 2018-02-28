<template>
  <div class="blockchain">
    <section
      class="blockchain_add-block"
      v-if="isBlockchainCreated">
      <label :model="data" for="data">Dados:</label>
      <input name="data" type="text" @keyup.enter="addBlock">
      <button @click="addBlock" v-if="!mining">Adicionar</button>
    </section>
    <section
      class="blockchain__last-block"
      v-if="isBlockchainCreated">
      <p>
        Index: {{ lastBlock.index }}
      </p>
      <p>
        Previuos Hash: {{ lastBlock.previousHash }}
      </p>
      <p>
        Timestamp: {{ lastBlock.timestamp }}
      </p>
      <p>
        Data: {{ lastBlock.data }}
      </p>
      <p>
        Hash: {{ lastBlock.hash }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BlockChain',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: '',
      mining: false,
    };
  },
  methods: {
    addBlock() {
      this.$store.dispatch('addBlock', this.data);
    },
  },
  computed: {
    isBlockchainCreated() {
      return !!this.$store.getters.blockchain;
    },

    lastBlock() {
      return this.$store.getters.blockchain.getLatestBlock();
    },
  },
};
</script>

<style scoped></style>

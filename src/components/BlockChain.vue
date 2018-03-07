<template>
  <div class="blockchain">
    <section
      class="blockchain_add-block"
      v-if="isBlockchainCreated">
      <label for="data">Dados:</label>
      <input v-model="data"
        name="data"
        type="text"
        @keyup.enter="addBlock">
      <button @click="addBlock" v-if="!mining">Adicionar</button>
      <button v-if="mining" disabled>Minerando</button>
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
      data: '',
      lastBlock: {},
    };
  },
  methods: {
    addBlock() {
      this.$store
        .dispatch('addBlock', { data: this.data })
        .then((lastBlock) => {
          this.lastBlock = lastBlock;
        });
    },
  },
  computed: {
    isBlockchainCreated() {
      return !!this.$store.getters.blockchain;
    },

    mining() {
      return this.$store.getters.mining;
    },
  },
};
</script>

<style scoped></style>

<template>
    <div class="modal">
      <h2>Add Income</h2>
      <form @submit.prevent="addIncome">
        <input type="number" v-model="amount" placeholder="Amount" required />
        <input type="date" v-model="date" required />
        <input type="text" v-model="source" placeholder="Source" required />
        <button type="submit">Add</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
</template>
  
<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup(_, { emit }) {
      const store = useStore();
      const amount = ref(0);
      const date = ref('');
      const source = ref('');
  
      const addIncome = () => {
        store.commit('ADD_INCOME', { amount: parseFloat(amount.value), date: date.value, source: source.value });
        emit('close');
      };
  
      return {
        amount,
        date,
        source,
        addIncome
      };
    }
  };
</script>
  
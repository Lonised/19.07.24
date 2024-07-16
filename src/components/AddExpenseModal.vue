<template>
    <div class="modal">
      <h2>Add Expense</h2>
      <form @submit.prevent="addExpense">
        <input type="number" v-model="amount" placeholder="Amount" required />
        <input type="date" v-model="date" required />
        <select v-model="category" required>
          <option value="food">Food</option>
          <option value="clothing">Clothing</option>
          <option value="transport">Transport</option>
          <option value="other">Other</option>
        </select>
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
      const category = ref('food');
  
      const addExpense = () => {
        store.commit('ADD_EXPENSE', { amount: parseFloat(amount.value), date: date.value, category: category.value });
        emit('close');
      };
  
      return {
        amount,
        date,
        category,
        addExpense
      };
    }
  };
</script>
  
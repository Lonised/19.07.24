<template>
    <div>
      <h2>Largest Expense</h2>
      <p>{{ largestExpense.category }}: {{ largestExpense.amount }}</p>
    </div>
</template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const largestExpense = computed(() => store.getters.largestExpense);
  
      return {
        largestExpense
      };
    }
  };
</script>
  
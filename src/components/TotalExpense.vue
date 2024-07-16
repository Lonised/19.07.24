<template>
    <div>
      <h2>Total Expense</h2>
      <p>{{ totalExpense }}</p>
    </div>
</template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const totalExpense = computed(() => store.getters.totalExpense);
  
      return {
        totalExpense
      };
    }
  };
</script>
  
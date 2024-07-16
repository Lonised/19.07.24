<template>
    <div>
      <h2>Total Income</h2>
      <p>{{ totalIncome }}</p>
    </div>
</template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const totalIncome = computed(() => store.getters.totalIncome);
  
      return {
        totalIncome
      };
    }
  };
</script>
  
<template>
    <div>
      <h2>Total Balance</h2>
      <p>{{ balance }}</p>
    </div>
</template>
  
<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const balance = computed(() => store.getters.balance);
  
      return {
        balance
      };
    }
  };
</script>
  
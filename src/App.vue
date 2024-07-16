<template>
  <div id="app">
    <IncomeExpenses />
  </div>
</template>

<script>
import IncomeExpenses from './components/IncomeExpenses.vue';

export default {
  components: {
    IncomeExpenses
  }
};
</script>

<style>
/* Global styles for your application can be added here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

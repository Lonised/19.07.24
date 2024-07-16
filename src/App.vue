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

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff; 
}

#app {
}


.IncomeExpenses {
  max-width: 800px; 
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid #ccc; 
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}




h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}


form {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

li button {
  margin-left: 1rem;
  padding: 5px 10px;
  background-color: #f44336; 
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

li button:hover {
  background-color: #d32f2f; 
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049; 
}

</style>

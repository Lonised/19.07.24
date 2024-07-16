<template>
    <div>
      <h3>Add Expense</h3>
      <form @submit.prevent="addExpense">
        <label>Amount:</label>
        <input type="number" v-model="newExpense.amount" required>
        <label>Date:</label>
        <input type="date" v-model="newExpense.date" required>
        <label>Category:</label>
        <select v-model="newExpense.category" required>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newExpense: {
          amount: null,
          date: '',
          category: 'Food'
        }
      };
    },
    methods: {
      addExpense() {
        // Передача нового расхода в родительский компонент через событие
        this.$emit('new-expense', this.newExpense);
        // Очистка формы после добавления расхода
        this.newExpense = {
          amount: null,
          date: '',
          category: 'Food'
        };
      }
    }
  };
  </script>
  
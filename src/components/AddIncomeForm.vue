<template>
    <div>
      <h3>Add Income</h3>
      <form @submit.prevent="addIncome">
        <label>Amount:</label>
        <input type="number" v-model="newIncome.amount" required>
        <label>Date:</label>
        <input type="date" v-model="newIncome.date" required>
        <label>Source:</label>
        <input type="text" v-model="newIncome.source" required>
        <button type="submit">Add Income</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newIncome: {
          amount: null,
          date: '',
          source: ''
        }
      };
    },
    methods: {
      addIncome() {
        // Передача нового дохода в родительский компонент через событие
        this.$emit('new-income', this.newIncome);
        // Очистка формы после добавления дохода
        this.newIncome = {
          amount: null,
          date: '',
          source: ''
        };
      }
    }
  };
  </script>
  
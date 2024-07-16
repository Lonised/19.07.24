<template>
    <div>
      <h2>Income and Expenses Management</h2>
  

      <div>
        <h3>Add Income</h3>
        <form @submit.prevent="addIncome">
          <label>Date:</label>
          <input type="date" v-model="newIncome.date" required>
          <label>Amount:</label>
          <input type="number" v-model="newIncome.amount" required>
          <label>Source:</label>
          <input type="text" v-model="newIncome.source" required>
          <button type="submit">Add Income</button>
        </form>
      </div>
  

      <div>
        <h3>Add Expense</h3>
        <form @submit.prevent="addExpense">
          <label>Date:</label>
          <input type="date" v-model="newExpense.date" required>
          <label>Amount:</label>
          <input type="number" v-model="newExpense.amount" required>
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
  

      <div>
        <h3>Incomes</h3>
        <ul>
          <li v-for="(income, index) in incomes" :key="index">
            {{ income.date }} - ${{ income.amount }} from {{ income.source }}
            <button @click="removeIncome(index)">Remove</button>
          </li>
        </ul>
      </div>
  

      <div>
        <h3>Expenses</h3>
        <ul>
          <li v-for="(expense, index) in expenses" :key="index">
            {{ expense.date }} - ${{ expense.amount }} on {{ expense.category }}
            <button @click="removeExpense(index)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        incomes: [
 
        ],
        expenses: [

        ],
        newIncome: {
          date: '',
          amount: '',
          source: ''
        },
        newExpense: {
          date: '',
          amount: '',
          category: ''
        }
      };
    },
    methods: {
      addIncome() {
        this.incomes.push({
          date: this.newIncome.date,
          amount: parseFloat(this.newIncome.amount),
          source: this.newIncome.source
        });
        this.newIncome.date = '';
        this.newIncome.amount = '';
        this.newIncome.source = '';
      },
      addExpense() {
        this.expenses.push({
          date: this.newExpense.date,
          amount: parseFloat(this.newExpense.amount),
          category: this.newExpense.category
        });
        this.newExpense.date = '';
        this.newExpense.amount = '';
        this.newExpense.category = '';
      },
      removeIncome(index) {
        this.incomes.splice(index, 1);
      },
      removeExpense(index) {
        this.expenses.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
  }
  
  button {
    margin-left: 1rem;
  }
  </style>
  
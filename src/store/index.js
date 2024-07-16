import { createStore } from 'vuex';

export default createStore({
  state: {
    incomes: JSON.parse(localStorage.getItem('incomes')) || [],
    expenses: JSON.parse(localStorage.getItem('expenses')) || [],
  },
  mutations: {
    ADD_INCOME(state, income) {
      state.incomes.push(income);
      localStorage.setItem('incomes', JSON.stringify(state.incomes));
    },
    ADD_EXPENSE(state, expense) {
      state.expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    REMOVE_EXPENSE(state, index) {
      state.expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    REMOVE_INCOME(state, index) {
      state.incomes.splice(index, 1);
      localStorage.setItem('incomes', JSON.stringify(state.incomes));
    }
  },
  getters: {
    totalIncome: state => state.incomes.reduce((sum, income) => sum + income.amount, 0),
    totalExpense: state => state.expenses.reduce((sum, expense) => sum + expense.amount, 0),
    largestExpense: state => state.expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current, { amount: 0 }),
    balance: (state, getters) => getters.totalIncome - getters.totalExpense,
  }
});

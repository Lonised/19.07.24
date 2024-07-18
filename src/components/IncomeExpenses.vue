<template>
<div class="wrapper-header">
  <div class="header">
    <h2>Статистика о доходах и расходах</h2>
  </div>
</div>

<div class="wrapper-main">
  <div class="main">
    <div class="income">
      <h3>Доходы</h3>
      <div class="line"></div>
      <form @submit.prevent="addIncome">
        <label>Дата:</label>
        <input type="date" v-model="newIncome.date" required>
        <label>Сумма:</label>
        <input type="number" v-model="newIncome.amount" required>
        <label>От кого:</label>
        <input type="text" v-model="newIncome.source" required>
        <button class="addbtn" type="submit">Добавить</button>
      </form>
    </div>

    <div class="expense">
      <h3>Расходы</h3>
      <div class="line"></div>
      <form @submit.prevent="addExpense">
        <label>Дата:</label>
        <input type="date" v-model="newExpense.date" required>
        <label>Сумма:</label>
        <input type="number" v-model="newExpense.amount" required>
        <label>Категория:</label>
        <select v-model="newExpense.category" required>
          <option>Еда</option>
          <option>Одежда</option>
          <option>Транспорт</option>
          <option>Развлечения</option>
          <option>Электроника</option>
          <option>Коммунальные</option>
          <option>Медицина</option>
          <option>Образование</option>
          <option>Книги</option>
          <option>Хобби</option>
          <option>Подарки</option>
          <option>Мебель</option>
          <option>Ремонт</option>
          <option>Спорт</option>
          <option>Туризм</option>
          <option>Страховка</option>
          <option>Интернет</option>
          <option>Телефон</option>
          <option>Обувь</option>
          <option>Косметика</option>
          <option>Продукты</option>
          <option>Такси</option>
          <option>Сервисы</option>
          <option>Благотворительность</option>
        </select>
        <button class="addbtn" type="submit">Добавить</button>
      </form>
    </div>
  </div>

  <div class="postmain">
    <div class="postmain-income">
      <h3>Доходы</h3>
      <div class="postmain-line"></div>
      <ul>
        <li v-for="(income, index) in incomes" :key="index">
          {{ income.date }} - ₸{{ income.amount }} from {{ income.source }}
          <button @click="removeIncome(index)">Очистить</button>
        </li>
      </ul>
    </div>

    <div class="postmain-expenses">
      <h3>Расходы</h3>
      <div class="postmain-line"></div>
      <ul>
        <li v-for="(expense, index) in expenses" :key="index">
          {{ expense.date }} - ₸{{ expense.amount }} on {{ expense.category }}
          <button @click="removeExpense(index)">Очистить</button>
        </li>
      </ul>
    </div>
  </div>

  <div class="wrapper-pie">
    <div class="pieIncome">
      <IncomeChart :chartData="incomeChartData" :options="chartOptions"></IncomeChart>
    </div>
    <div class="pieExpense">
      <ExpenseChart :chartData="expenseChartData" :options="chartOptions"></ExpenseChart>
    </div>
  </div>
</div>


</template>

<script>
import IncomeChart from './IncomeChart.vue';
import ExpenseChart from './ExpenseChart.vue';

export default {
  components: {
    IncomeChart,
    ExpenseChart,
  },
  data() {
    return {
      incomes: [],
      expenses: [],
      newIncome: {
        date: '',
        amount: '',
        source: '',
      },
      newExpense: {
        date: '',
        amount: '',
        category: '',
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.loadIncomes();
    this.loadExpenses();
    this.updateChartData();
  },
  methods: {
    addIncome() {
      const incomeDate = this.newIncome.date || new Date().toISOString().slice(0, 10);
      this.incomes.push({
        date: incomeDate,
        amount: parseFloat(this.newIncome.amount),
        source: this.newIncome.source,
      });
      this.newIncome.date = '';
      this.newIncome.amount = '';
      this.newIncome.source = '';
      this.saveIncomes();
      this.updateChartData();
    },
    addExpense() {
      const expenseDate = this.newExpense.date || new Date().toISOString().slice(0, 10);
      this.expenses.push({
        date: expenseDate,
        amount: parseFloat(this.newExpense.amount),
        category: this.newExpense.category,
      });
      this.newExpense.date = '';
      this.newExpense.amount = '';
      this.newExpense.category = '';
      this.saveExpenses();
      this.updateChartData();
    },
    removeIncome(index) {
      this.incomes.splice(index, 1);
      this.saveIncomes();
      this.updateChartData();
    },
    removeExpense(index) {
      this.expenses.splice(index, 1);
      this.saveExpenses();
      this.updateChartData();
    },
    saveIncomes() {
      localStorage.setItem('incomes', JSON.stringify(this.incomes));
    },
    saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    },
    loadIncomes() {
      const savedIncomes = localStorage.getItem('incomes');
      if (savedIncomes) {
        this.incomes = JSON.parse(savedIncomes);
      }
    },
    loadExpenses() {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) {
        this.expenses = JSON.parse(savedExpenses);
      }
    },
    updateChartData() {
      const incomeSources = [...new Set(this.incomes.map(income => income.source))];
      const incomeAmounts = incomeSources.map(source => {
        return this.incomes
          .filter(income => income.source === source)
          .reduce((sum, income) => sum + income.amount, 0);
      });

      const expenseCategories = [...new Set(this.expenses.map(expense => expense.category))];
      const expenseAmounts = expenseCategories.map(category => {
        return this.expenses
          .filter(expense => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0);
      });

      this.incomeChartData = {
        labels: incomeSources,
        datasets: [
          {
            label: 'Доходы',
            backgroundColor: '#42A5F5',
            data: incomeAmounts,
          },
        ],
      };

      this.expenseChartData = {
        labels: expenseCategories,
        datasets: [
          {
            label: 'Расходы',
            backgroundColor: '#FF6384',
            data: expenseAmounts,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>




  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;


  font-family: "Merriweather", serif;
  font-weight: 200;
  font-style: normal;
}

.hidden {
  display: none;
}


.wrapper-header {
  width: 100%;
  height: 75px;
  box-shadow: 4px 13px 19px 4px rgba(34, 60, 80, 0.2);

  border-bottom: 2px solid black;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.header h2 {
  font-size: 20px;
}

.wrapper-main {
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  
  padding: 20px;
  gap: 20px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.line {
  width: 300px;
  height: 2px;
  background-color: black;
}

.income {
  width: 300px;
  height: 300px;
  border: 2px solid black;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.income h3 {
  padding: 10px;
}

.income form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.income input {
  width: 200px;
  border: 1px solid black;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  text-align: center;
}

.addbtn {
  width: 100px;
  height: 30px;
  background-color: #8a8a8a;
}

.addbtn:hover {
  background-color: #666666;
}

.addbtn:active {
  background-color: #666666;
}






.expense {
  width: 300px;
  height: 300px;
  border: 2px solid black;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.expense h3 {
  padding: 10px;
}

.expense form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.expense input {
  width: 200px;
  border: 1px solid black;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  text-align: center;
}

.expense select {
  width: 200px;
}

.addbtn {
  width: 100px;
  height: 30px;
  background-color: #8a8a8a;
}

.addbtn:hover {
  background-color: #666666;
}

.addbtn:active {
  background-color: #666666;
}


.postmain {
  height: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.postmain-line {
  width: 100%;
  height: 2px;
  background-color: black;
}

.postmain-income {
  width: 500px;
  height: 300px;
  border: 2px solid black;
}

.postmain-income h3 {
  padding: 20px;
}

.postmain-income li {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.postmain-income button {
  background-color: #8a8a8a;
  width: 100px;
}

.postmain-income button:hover {
  background-color: #666666;
}



.postmain-expenses {
  width: 500px;
  height: 300px;
  border: 2px solid black;
}

.postmain-expenses h3 {
  padding: 20px;
}

.postmain-expenses li {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.postmain-expenses button {
  background-color: #8a8a8a;
  width: 100px;
}

.postmain-expenses button:hover {
  background-color: #666666;
}


.wrapper-pie {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pieIncome {
  width: 400px;
  height: 300px;
  border: 2px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
}

.pieExpense {
  width: 400px;
  height: 300px;
  border: 2px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
  
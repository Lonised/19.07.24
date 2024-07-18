<template class="container">
  <div class="wrapper">
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
          <div class="postmainIncomeUp">
            <h3>Доходы</h3>
          </div>
          <div class="postmain-line"></div>
          <div class="postmainIncomeMiddle">
            <ul>
              <li v-for="(income, index) in incomes" :key="index">
                ₸ {{ income.amount }} - {{ income.date }} : {{ income.source }}
                <button @click="removeIncome(index)">Очистить</button>
              </li>
            </ul>
          </div>
          <div class="postmain-line"></div>
          <div class="postmainIncomeDown">
            <p v-if="incomes.length > 0">Наибольший доход: ₸{{ maxIncome.amount }} ({{ maxIncome.source }})</p>
          </div>
        </div>

        <div class="postmain-expense">
          <div class="postmainExpenseUp">
            <h3>Расходы</h3>
          </div>
          <div class="postmain-line"></div>
          <div class="postmainExpenseMiddle">
            <ul>
              <li v-for="(expense, index) in expenses" :key="index">
                ₸ {{ expense.amount }} - {{ expense.date }} : {{ expense.category }}
                <button @click="removeExpense(index)">Очистить</button>
              </li>
            </ul>
          </div>
          <div class="postmain-line"></div>
          <div class="postmainExpenseDown">
            <p v-if="expenses.length > 0">Наибольший расход: ₸{{ maxExpense.amount }} ({{ maxExpense.category }})</p>
          </div>
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
      incomeChartData: {
        labels: [],
        datasets: [
          {
            label: 'Доходы',
            data: [],
            backgroundColor: [],
          },
        ],
      },
      expenseChartData: {
        labels: [],
        datasets: [
          {
            label: 'Расходы',
            data: [],
            backgroundColor: [],
          },
        ],
      },
      colors: [
        '#42A5F5', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
      ],
    };
  },
  computed: {
    maxIncome() {
      if (this.incomes.length === 0) return { amount: 0, source: '-' };
      return this.incomes.reduce((max, income) => (income.amount > max.amount ? income : max), this.incomes[0]);
    },
    maxExpense() {
      if (this.expenses.length === 0) return { amount: 0, category: '-' };
      return this.expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), this.expenses[0]);
    },
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
            backgroundColor: this.colors.slice(0, incomeSources.length),
            data: incomeAmounts,
          },
        ],
      };

      this.expenseChartData = {
        labels: expenseCategories,
        datasets: [
          {
            label: 'Расходы',
            backgroundColor: this.colors.slice(0, expenseCategories.length),
            data: expenseAmounts,
          },
        ],
      };
    },
  },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;


  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;


}

.hidden {
  display: none;
}


.wrapper-header {
  width: 100%;
  height: 75px;
  background-color: #1C1E21;
  color: #77818E;
  box-shadow: 0px 0px 14px 0px rgba(0,  0,  0, 1);

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
  
  padding: 50px;
  gap: 50px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.line {
  width: 300px;
  height: 2px;
  background-color: #77818E;
}

.income {
  width: 300px;
  height: 400px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  border: 1px solid #77818E;
  color: #77818E;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  text-align: center;

  background-color: transparent;
}

.addbtn {
  width: 100px;
  height: 30px;
  background-color: #111111;
  color: #77818E; 
}

.addbtn:hover {
  background-color: #000000;
}

.addbtn:active {
  background-color: #000000;
}






.expense {
  width: 300px;
  height: 400px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  border: 1px solid #77818E;
  background-color: transparent;
  color: #77818E;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  text-align: center;

  background-color: transparent;
}


.expense select {
  width: 200px;
  border: 1px solid #77818E;
  background-color: transparent;
  color: #77818E;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  text-align: center;

  background-color: transparent;
}


.addbtn {
  width: 100px;
  height: 30px;
  background-color: #111111;
  color: #77818E; 
}

.addbtn:hover {
  background-color: #000000;
}

.addbtn:active {
  background-color: #000000;
}









.postmain {
  height: 1000px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.postmain-line {
  width: 100%;
  height: 2px;
  background-color: #77818E;
}

.postmain-income {
  width: 500px;
  height: 400px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding-top: 20px;
  padding-bottom: 70px;
}

.postmain-income h3 {
  padding: 20px;
}

.postmain-income ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.postmain-income li {
  width: 100%;
  height: 30%;
  border: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  gap: 10px;
}

.postmain-income button {
  background-color: #111111;
  color:#77818E;
  width: 100px;
}

.postmain-income button:hover {
  background-color: #000000;
}



.postmain-expense {
  width: 500px;
  height: 400px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding-top: 20px;
  padding-bottom: 70px;
}

.postmain-expense h3 {
  padding: 20px;
}

.postmain-expense ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.postmain-expense li {
  width: 100%;
  height: 30%;
  border: 0;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  gap: 10px;
}

.postmain-expense button {
  background-color: #111111;
  color:#77818E;
  width: 100px;
}

.postmain-expense button:hover {
  background-color: #000000;
}


.wrapper-pie {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pieIncome {
  width: 400px;
  height: 600px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  display: flex;
  justify-content: center;
  align-items: center;
}

.pieExpense {
  width: 400px;
  height: 600px;
  background-color: #1C1E21;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 36px 0px;
  color: #77818E;

  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
  
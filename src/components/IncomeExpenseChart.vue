<template>
  <div>
    <h2>Доходы и Расходы</h2>
    <IncomeChart :chartData="incomeChartData" :options="chartOptions" />
    <ExpenseChart :chartData="expenseChartData" :options="chartOptions" />
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    incomeChartData() {
      const dates = this.incomes.map(income => income.date);
      const amounts = this.incomes.map(income => income.amount);

      return {
        labels: dates,
        datasets: [
          {
            label: 'Доходы',
            backgroundColor: '#f87979',
            data: amounts,
          },
        ],
      };
    },
    expenseChartData() {
      const dates = this.expenses.map(expense => expense.date);
      const amounts = this.expenses.map(expense => expense.amount);

      return {
        labels: dates,
        datasets: [
          {
            label: 'Расходы',
            backgroundColor: '#7C8CF8',
            data: amounts,
          },
        ],
      };
    },
  },
  props: {
    incomes: {
      type: Array,
      required: true,
    },
    expenses: {
      type: Array,
      required: true,
    },
  },
};
</script>

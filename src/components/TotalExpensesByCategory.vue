<template>
  <div>
    <canvas ref="expensesChart"></canvas>
  </div>
</template>

<script>
import { ref, watch, onBeforeUnmount } from 'vue';
import { Chart } from 'chart.js'; // Удаляем импорт PieController, если он не используется

export default {
  props: {
    expenses: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const expensesChart = ref(null);
    let chartInstance = null;

    const updateChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Уничтожаем предыдущий график
      }

      const ctx = expensesChart.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Food', 'Clothing', 'Transport', 'Other'],
          datasets: [{
            label: 'Expenses by Category',
            data: calculateExpenses(props.expenses),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED']
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    };

    const calculateExpenses = (expenses) => {
      // Логика для расчета сумм расходов по категориям
      // Пример: суммируем все расходы по категориям
      const categoryExpenses = {
        Food: 0,
        Clothing: 0,
        Transport: 0,
        Other: 0
      };

      expenses.forEach(expense => {
        if (Object.prototype.hasOwnProperty.call(categoryExpenses, expense.category)) {
          categoryExpenses[expense.category] += expense.amount;
        }
      });

      return Object.values(categoryExpenses);
    };

    watch(() => props.expenses, () => {
      updateChart();
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy(); // Уничтожаем график перед удалением компонента
      }
    });

    return {
      expensesChart
    };
  }
};
</script>

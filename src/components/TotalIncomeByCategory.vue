<template>
  <div>
    <h2>Total Income by Category</h2>
    <canvas ref="incomeChart"></canvas>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Chart from 'chart.js/auto'; // Используем автоматическую загрузку для Chart.js

export default {
  props: {
    incomes: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const incomeChart = ref(null);

    watchEffect(() => {
      if (!incomeChart.value) return;

      // Подготовка данных для графика
      const categories = ['Salary', 'Investment', 'Bonus', 'Other'];
      const data = categories.map(category => {
        return props.incomes.filter(income => income.source === category)
                            .reduce((sum, income) => sum + income.amount, 0);
      });

      // Создание нового экземпляра графика
      new Chart(incomeChart.value, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            label: 'Income by Source',
            backgroundColor: ['#99ccff', '#99ffff', '#99ff99', '#ffcc99'],
            data: data
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                }
              }
            }
          }
        }
      });

    });

    return {
      incomeChart
    };
  }
};
</script>

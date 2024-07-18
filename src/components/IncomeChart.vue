<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { defineComponent, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

Chart.register(...registerables);

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      nextTick(() => {
        if (chartCanvas.value) {
          chartInstance = new Chart(chartCanvas.value, {
            type: 'pie', // Change to 'pie'
            data: props.chartData,
            options: props.options,
          });
        }
      });
    };

    watch(
      () => props.chartData,
      () => {
        renderChart();
      },
      { deep: true }
    );

    watch(
      () => props.options,
      () => {
        if (chartInstance) {
          chartInstance.options = props.options;
          chartInstance.update();
        }
      },
      { deep: true }
    );

    onMounted(() => {
      renderChart();
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      chartCanvas,
    };
  },
});
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 300px !important;
}
</style>

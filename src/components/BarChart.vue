<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Bar } from 'vue-chartjs';

interface BarData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  backgroundColor: string;
  data: number[];
}

@Component
export default class BarChart extends Mixins(Bar) {
  @Prop() private chartData!: BarData;
  @Prop() private options!: object;

  public mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>

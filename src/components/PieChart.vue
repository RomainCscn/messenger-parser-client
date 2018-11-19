<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Pie, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

interface PieData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  backgroundColor: string;
  data: number[];
}

@Component
export default class PieChart extends Mixins(Pie, reactiveProp) {
  @Prop() private chartData!: PieData;
  @Prop() private options!: object;

  public mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>

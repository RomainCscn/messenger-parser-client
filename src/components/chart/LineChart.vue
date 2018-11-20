<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

interface LineData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  backgroundColor: string;
  data: number[];
}

@Component
export default class LineChart extends Mixins(Line, reactiveProp) {
  @Prop() private chartData!: LineData;
  @Prop() private options!: object;

  public mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  }
}
</script>

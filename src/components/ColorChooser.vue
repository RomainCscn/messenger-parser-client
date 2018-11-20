<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ColorChooser extends Vue {
  private colors: string[] = ['#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854'];

  public returnColors(colorsNumber: number) {
    return this.colors.slice(0, colorsNumber);
  }

  public returnColor(colorNumber: number) {
    return this.colors[colorNumber];
  }
}
</script>

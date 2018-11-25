<template>
  <div class="columns is-centered">
    <div v-if="this.totalLinks > 0" class="column links-info">
      <div class="total-links-number">
        {{totalLinks}}
      </div>
      <div class="total-links-label">
        Links sent in total
      </div>
    </div>
    <div v-if="totalLinksYear > 0" class="column links-info">
      <div class="total-links-number">
        {{totalLinksYear}}
      </div>
      <div class="total-links-label">
        Links sent in {{currentYear}}
      </div>
    </div>
    <div v-if="totalLinksMonth > 0" class="column links-info">
      <div class="total-links-number">
        {{totalLinksMonth}}
      </div>
      <div class="total-links-label">
        Links sent in {{currentMonthName}}, {{currentYear}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LinksInfo extends Vue {
  @Prop() private totalLinks!: number;
  @Prop() private totalLinksYear!: number;
  @Prop() private totalLinksMonth!: number;

  private currentYear = (new Date()).getFullYear();
  private currentMonth = (new Date()).getMonth() + 1;
  private currentMonthName = (new Date()).toLocaleString('en-us', {month: 'long'});

}
</script>

<style lang="scss" scoped>

.links-info {
  text-align: center;
}

.total-links-number {
  font-size: 3rem;
}

.total-links-label {
  color: gray;
}

</style>

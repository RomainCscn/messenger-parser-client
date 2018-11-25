<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Statistics about your links
          </h1>
          <h2 class="subtitle">
            Find out how many links you sent this year <em style="color: #b5b5b5">(and way more)</em>
          </h2>
        </div>
      </div>
    </section>
    <Statistics/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Statistics from '@/components/Statistics.vue';

@Component({
  components: {
    Statistics,
  },
})
export default class Stats extends Vue {}
</script>

<style lang="scss" scoped>

</style>

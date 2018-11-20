<template>
  <div class="section">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Statistics about your messages
          </h1>
          <h2 class="subtitle">
            <em>How many links did you send this month?</em> And way more
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <Statistics/>
    </div>
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

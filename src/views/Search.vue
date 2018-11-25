<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Search across all your links
          </h1>
          <h2 class="subtitle">
            Use various filters to refine your search <em style="color: #b5b5b5">(filters are optional)</em>
          </h2>
        </div>
      </div>
    </section>
    <Links/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Links from '@/components/Links.vue';

@Component({
  components: {
    Links,
  },
})
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>

</style>

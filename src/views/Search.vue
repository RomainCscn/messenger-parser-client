<template>
  <div class="section">
    <div class="container">
      <Links/>
    </div>
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

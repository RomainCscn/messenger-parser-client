<template>
  <div class="search">
    <h1>This is a revolution.</h1>
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

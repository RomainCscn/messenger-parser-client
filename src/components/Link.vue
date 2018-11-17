<template>
  <div>
    {{senderName}} sent <a target="blank" :href="link">{{link}}</a> the {{date}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Link extends Vue {
@Prop() private senderName!: string;
@Prop() private date!: string;
@Prop() private link!: string;

}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="select">
    <select v-model="selected" @change="update" id="months">
      <option value="0">No month</option>
      <option v-for="month in months" :value="month.value" v-bind:key="month.value">{{month.text}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Months extends Vue {
  private months: object[] = [
    { text: 'January', value: 1 },
    { text: 'February', value: 2 },
    { text: 'March', value: 3 },
    { text: 'April', value: 4 },
    { text: 'May', value: 5 },
    { text: 'June', value: 6 },
    { text: 'July', value: 7 },
    { text: 'August', value: 8 },
    { text: 'September', value: 9 },
    { text: 'October', value: 10 },
    { text: 'November', value: 11 },
    { text: 'December', value: 12 },
  ];

  private selected: number = 0;

  private update() {
      this.$emit('selected', this.selected);
  }
}
</script>

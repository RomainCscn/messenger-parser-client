<template>
  <div class="select">
    <select v-model="selected" @change="update" id="days">
      <option value="0">No day</option>
      <option v-for="day in days" :value="day" v-bind:key="day">{{day}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Days extends Vue {
  private days: number[] = [];
  private selected: number = 0;

  private mounted() {
    for (let i = 1;  i < 32; i++) {
      this.days.push(i);
    }
  }

  private update() {
    this.$emit('selected', this.selected);
  }
}
</script>

<template>
  <div class="select">
    <select v-model="selected" @change="update" id="years">
      <option value="0">No year</option>
      <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Years extends Vue {
  private years: number[] = [
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
  ];

  private selected: number = 0;

  private update() {
    this.$emit('selected', this.selected);
  }
}
</script>

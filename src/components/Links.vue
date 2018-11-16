<template>
  <div>
    <input v-model="site" type="text" placeholder="Site">
    <input v-model="sender" type="text" placeholder="Sender">
    <button @click="search">Search</button>
    <div>{{links.length}} links</div>
    <div v-for="link in links" v-bind:key="link.date">{{link.sender_name}} sent <a target="blank" :href="link.link">{{link.link}}</a> the {{link.date}} </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Links extends Vue {

  links: Array<Object> = [];
  site: string = "";
  sender: string = "";

  private async searchAll() {
    try {
      const response = await axios.get('http://localhost:3000/search/all');
      console.log(response.data);
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSite() {
    try {
      const response = await axios.get('http://localhost:3000/search/site/' + this.site);
      console.log(response.data);
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSender() {
    try {
      const response = await axios.get('http://localhost:3000/search/sender/' + this.sender);
      console.log(response.data);
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSiteAndSender() {
    try {
      const response = await axios.get('http://localhost:3000/search/site/' + this.site + '/sender/' + this.sender);
      console.log(response.data);
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private search() {
    if (this.sender && this.site) {
      this.searchSiteAndSender();
    } else if (this.sender) {
      this.searchSender();
    } else if (this.site) {
      this.searchSite();
    } else {
      this.searchAll();
    }
  }
 }
</script>

<style lang="scss" scoped>

</style>

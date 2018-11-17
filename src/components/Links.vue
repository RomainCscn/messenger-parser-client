<template>
  <div>
    <input v-model="site" type="text" placeholder="Site">
    <input v-model="sender" type="text" placeholder="Sender">
    <input v-model="year" type="number" placeholder="Year" max="2018" min="2004">
    <input v-model="month" type="number" placeholder="Month" max="12" min="1">
    <input v-model="day" type="number" placeholder="Day" max="31" min="1">
    <button @click="search">Search</button>
    <div>{{links.length}} links</div>
    <Link v-for="link in links" v-bind="link" v-bind:senderName="link.sender_name" v-bind:key="link.date"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Link from '@/components/Link.vue';
import axios from 'axios';

@Component({
  components: {
    Link,
  },
})
export default class Links extends Vue {

  private links: object[] = [];
  private site: string = '';
  private sender: string = '';
  private year = null;
  private month = null;
  private day = null;

  get computedYear() {
    return this.year === '' ? null : this.year;
  }

  get computedMonth() {
    return this.month === '' ? null : this.month;
  }

  get computedDay()  {
    return this.day === '' ? null : this.day;
  }

  private async searchAll() {
    try {
      const response = await axios.get('http://localhost:3000/search/all', {
        params: {
          year: this.computedYear,
          month: this.computedMonth,
          day: this.computedDay,
        },
      });
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSite() {
    try {
      const response = await axios.get('http://localhost:3000/search/site/' + this.site, {
        params: {
          year: this.computedYear,
          month: this.computedMonth,
          day: this.computedDay,
        },
      });
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSender() {
    try {
      const response = await axios.get('http://localhost:3000/search/sender/' + this.sender, {
        params: {
          year: this.computedYear,
          month: this.computedMonth,
          day: this.computedDay,
        },
      });
      this.links = response.data.links;
    } catch (error) {
      console.error(error);
    }
  }

  private async searchSiteAndSender() {
    try {
      const response = await axios.get('http://localhost:3000/search/site/' + this.site + '/sender/' + this.sender, {
        params: {
          year: this.computedYear,
          month: this.computedMonth,
          day: this.computedDay,
        },
      });
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

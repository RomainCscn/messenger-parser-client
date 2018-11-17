<template>
  <div>
    <input v-model="site" type="text" placeholder="Site">
    <input v-model="sender" type="text" placeholder="Sender">
    <Years @selected="updateYear"></Years>
    <Months @selected="updateMonth"></Months>
    <Days @selected="updateDays"></Days>
    <button @click="search">Search</button>
    <div>{{links.length}} links</div>
    <Link v-for="link in links" v-bind="link" v-bind:senderName="link.sender_name" v-bind:key="link.date"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Link from '@/components/Link.vue';
import Days from '@/components/Days.vue';
import Months from '@/components/Months.vue';
import Years from '@/components/Years.vue';
import axios from 'axios';

@Component({
  components: {
    Link,
    Days,
    Months,
    Years,
  },
})
export default class Links extends Vue {

  private links: object[] = [];
  private site: string = '';
  private sender: string = '';
  private year: number = 0;
  private month: number = 0;
  private day: number = 0;

  get computedYear() {
    return this.year === 0 ? null : this.year;
  }

  get computedMonth() {
    return this.month === 0 ? null : this.month;
  }

  get computedDay()  {
    return this.day === 0 ? null : this.day;
  }

  private updateYear(value: any) {
    this.year = value === "0" ? 0 : value;
  }

  private updateMonth(value: any) {
    this.month = value === "0" ? 0 : value;
  }

  private updateDays(value: any) {
    this.day = value === "0" ? 0 : value;
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

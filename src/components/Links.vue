<template>
  <div>
    <div class="field">
      <span class="label">Filter by site:</span>
      <input class="input" v-model="site" type="text" placeholder="Site">
    </div>
    <div class="field">
      <span class="label">Filter by sender:</span>
      <input class="input" v-model="sender" type="text" placeholder="Sender">
    </div>
    <div class="field">
      <span class="label">Filter by date:</span>
      <div class="date-container">
        <Years class="date-selector" @selected="updateYear"></Years>
        <Months class="date-selector" @selected="updateMonth"></Months>
        <Days class="date-selector" @selected="updateDays"></Days>
      </div>
    </div>
    <div class="has-text-centered">
      <button class="button is-primary" @click="search">Search</button>
      <div class="is-italic" v-if="searched">{{links.length}} link<span v-if="links.length > 0">s</span> found</div>
    </div>
    <Link class="link-test" v-for="link in links" v-bind="link" v-bind:senderName="link.sender_name" v-bind:key="link.date"/>
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
  private searched: boolean = false;

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
    this.year = value === '0' ? 0 : value;
  }

  private updateMonth(value: any) {
    this.month = value === '0' ? 0 : value;
  }

  private updateDays(value: any) {
    this.day = value === '0' ? 0 : value;
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
      this.searched = true;
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
      this.searched = true;
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
      this.searched = true;
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
      this.searched = true;
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

.link-test {
  margin: 12px 0;
}

.date-container {
  display: flex;
  justify-content: start;
}

.date-selector {
  margin-right: 12px;
}

</style>

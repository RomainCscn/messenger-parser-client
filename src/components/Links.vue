<template>
  <div>
    <div class="field">
      <span class="label">Site filter</span>
      <input class="input" v-model="site" type="text" placeholder="Site">
    </div>
    <div class="field">
      <span class="label">Sender filter</span>
      <input class="input" v-model="sender" type="text" placeholder="Sender">
    </div>
    <div class="field">
      <span class="label">Date filter</span>
      <div class="date-container">
        <Years class="date-selector" v-bind:class="{ 'is-danger': showDateError }" @selected="updateYear"></Years>
        <Months class="date-selector" @selected="updateMonth"></Months>
        <Days class="date-selector day-selector" @selected="updateDays"></Days>
        <article v-if="showDateError" class="message is-danger date-error-container">
          <div class="message-body date-error-msg">
            Input at least a year or no date at all.
          </div>
        </article>
      </div>
    </div>
    <div class="field is-grouped search-container">
      <div class="control">
        <button class="button is-primary is-medium" @click="search">
          <span class="icon">
            <img src="../assets/search.svg" style="max-height: 24px"/>
          </span>
          <span>Search</span>
        </button>
      </div>
      <div class="control">
        <button class="button is-text details" v-if="searchedLinks.length > 0" @click="showLinksDetails = !showLinksDetails">
          {{ showLinksDetails ? "Hide" : "Show"}} all details
        </button>
      </div>
      <div class="is-italic links-number" v-if="searched && searchedLinks.length >= 0">{{searchedLinks.length}} link<span v-if="searchedLinks.length > 0">s</span> found</div>
    </div>
    <Link class="link-test" v-for="link in searchedLinks" v-bind="link" v-bind:showDetails="showLinksDetails" v-bind:senderName="link.sender_name" v-bind:key="link.date"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Link from '@/components/Link.vue';
import Days from '@/components/Days.vue';
import Months from '@/components/Months.vue';
import Years from '@/components/Years.vue';
import store from '@/store';
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

  private site: string = '';
  private sender: string = '';
  private year: number = 0;
  private month: number = 0;
  private day: number = 0;
  private showLinksDetails: boolean = false;
  private showDateError: boolean = false;

  get computedYear() {
    return this.year === 0 ? null : this.year;
  }

  get computedMonth() {
    return this.month === 0 ? null : this.month;
  }

  get computedDay()  {
    return this.day === 0 ? null : this.day;
  }

  get validDate() {
    const noDate = !this.computedYear && !this.computedMonth && !this.computedDay;
    return noDate || this.computedYear !== null;
  }

  get searched() {
    return store.state.searched;
  }

  get searchedLinks() {
    return store.state.searchedLinks;
  }

  public async mounted() {
    const response = await axios.get('http://localhost:3000/search/all');
    store.commit('setAllLinks', response.data.links);
  }

  private updateYear(value: any) {
    this.year = value === '0' ? 0 : value;
    if (this.validDate) {
      this.showDateError = false;
    }
  }

  private updateMonth(value: any) {
    this.month = value === '0' ? 0 : value;
    if (this.validDate) {
      this.showDateError = false;
    }
  }

  private updateDays(value: any) {
    this.day = value === '0' ? 0 : value;
    if (this.validDate) {
      this.showDateError = false;
    }
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
      store.commit('setSearched', true);
      store.commit('setSearchedLinks', response.data.links);
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
      store.commit('setSearched', true);
      store.commit('setSearchedLinks', response.data.links);
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
      store.commit('setSearched', true);
      store.commit('setSearchedLinks', response.data.links);
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
      store.commit('setSearched', true);
      store.commit('setSearchedLinks', response.data.links);
    } catch (error) {
      console.error(error);
    }
  }

  private search() {
    if (this.validDate) {
      this.showDateError = false;
      if (this.sender && this.site) {
        this.searchSiteAndSender();
      } else if (this.sender) {
        this.searchSender();
      } else if (this.site) {
        this.searchSite();
      } else {
        this.searchAll();
      }
    } else {
      this.showDateError = true;
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
  flex-wrap: wrap;
}

.date-selector {
  margin-right: 12px;
}

.details {
  margin-top: 5px;
  cursor: pointer;
  text-decoration: none;
  &:focus, &:hover {
    outline: none;
    box-shadow: none;
    background: none;
  }
}

.links-number {
  margin-top: 12px;
}

@media all and (max-width: 715px) {
  .date-error-container {
    margin-top: 1rem;
  }
}

@media all and (max-width: 425px) {
  .day-selector {
    margin-top: 1rem;
  }
}

.date-error-msg {
  padding: 6px 12px;
}

.search-container {
  margin: 3rem 0;
}

</style>

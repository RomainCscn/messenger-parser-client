<template>
  <div class="columns is-multiline">
    <div class="column">
      <PieChart :chartData="sendersChartData()"/>
    </div>
    <div class="column">
      <LineChart :chartData="yearsChartData()"/>
    </div>
    <div class="column">
      <div class="select">
        <select v-model="selectedYear" name="year" id="year">
          <option v-for="year in allYears" :value="year" :key="year">{{year}}</option>
        </select>
      </div>
      <LineChart :chartData="monthsChartData(selectedYear)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import store from '@/store';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import ColorChooser from '@/components/ColorChooser.vue';

interface Link {
    date: string;
    sender_name: string;
    link: string;
}

interface ChartData {
  label: string;
  linksSent: number;
}

@Component({
  components: {
    LineChart,
    PieChart,
    ColorChooser,
  },
})
export default class Statistics extends Vue {

  private loaded: boolean = false;
  private links: Link[] = store.state.allLinks;
  private color = new ColorChooser();
  private selectedYear = '2018';

  public mounted() {
    this.searchAll();
  }

  get allYears() {
    return [...new Set(this.links.map((link) => link.date.split('-')[2].slice(0, 4)))];
  }

  get allSenders() {
    return [...new Set(this.links.map((link) => link.sender_name))];
  }

  get allMonths() {
    return [...new Set(this.links.map((link) => {
      const date = link.date.split('-');
      return date[1].concat('-' + date[2]).split(' ')[0];
    }))];
  }

  private disableBezier() {
    return {
      elements: {
        line: {
          tension: 0, // disables bezier curves
        },
      },
    };
  }

  private sendersChartData() {
    const sendersData: ChartData[] = [];
    this.allSenders.forEach((sender) => {
      sendersData.push({label: sender, linksSent: this.linksPerSender(this.links, sender).length});
    });
    return this.createPieChart(sendersData);
  }

  private yearsChartData() {
    const yearsData: ChartData[] = [];
    this.allYears.forEach((year) => {
      yearsData.push({label: year, linksSent: this.linksForYear(this.links, year).length });
    });
    return this.createLineChart(yearsData.reverse(), 'Total links sent');
  }

  private monthsChartData(year: string) {
    const monthsData: ChartData[] = [];
    this.allMonthsForYear(year).forEach((month) => {
      monthsData.push({label: month, linksSent: this.linksForMonth(this.linksForYear(this.links, year), month).length});
    });
    return this.createLineChart(monthsData.reverse(), 'Total links sent');
  }

  private allMonthsForYear(year: string) {
    return [...new Set(this.links
      .filter((link) => link.date.includes(year))
      .map((link) => {
        const date = link.date.split('-');
        return date[1].concat('-' + date[2]).split(' ')[0];
      }),
    )];
  }

  private async searchAll() {
    try {
      if (this.links.length === 0) {
        const response = await axios.get('http://localhost:3000/search/all');
        this.links = response.data.links;
        store.commit('setAllLinks', response.data.links);
      }
      // this.allSenders.forEach((sender) => {
      //   this.allYears.forEach((year) => {
      //     console.log(sender, year, this.linksForYear(this.linksPerSender(this.links, sender), year).length);
      //   });
      // });

      // this.allSenders.forEach((sender) => {
      //   this.allMonths.forEach((month) => {
      //     console.log(sender, month,
      //     this.linksForMonth(this.linksPerSender(this.links, sender), month).length);
      //   });
      // });

    } catch (error) {
      console.error(error);
    }
  }

  private linksPerSender(links: Link[], senderName: string) {
    return links.filter((link) => link.sender_name === senderName);
  }

  private linksForYear(links: Link[], year: string) {
    return links.filter((link) => link.date.includes(year));
  }

  private linksForMonth(links: Link[], monthAndYear: string) {
    return links.filter((link) => link.date.includes(monthAndYear));
  }

  private createPieChart(pieData: ChartData[]) {
    const labels = pieData.map((d) => d.label);
    const datasetsData = pieData.map((d) => d.linksSent);
    return {
      labels,
      datasets: [
        {
          backgroundColor: this.color.returnColors(datasetsData.length),
          data: datasetsData,
        },
      ],
    };
  }

  private createLineChart(pieData: ChartData[], label: string) {
    const labels = pieData.map((d) => d.label);
    const datasetsData = pieData.map((d) => d.linksSent);
    return {
      labels,
      datasets: [
        {
          label,
          backgroundColor: '#5DA5DA',
          borderColor: '#5DA5DA',
          data: datasetsData,
          fill: false,
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>

</style>

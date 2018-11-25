<template>
  <section>
    <div class="columns is-mobile">
      <div v-if="this.links.length > 0" class="column">
        <div class="total-links-number">
          {{this.links.length}}
        </div>
        <div class="total-links-label">
          Total links sent
        </div>
      </div>
      <div v-if="linksForYear(this.links, currentYear).length > 0" class="column">
        <div class="total-links-number">
          {{linksForYear(this.links, currentYear).length}}
        </div>
        <div class="total-links-label">
          Links sent in {{currentYear}}
        </div>
      </div>
      <div v-if="linksForMonth(this.links, currentMonth).length > 0" class="column">
        <div class="total-links-number">
          {{linksForMonth(this.links, `${currentMonth}-${currentYear}`).length}}
        </div>
        <div class="total-links-label">
          Links sent in {{currentMonthName}}
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-half-tablet">
        <div class="box">
          <PieChart :chartData="sendersChartData()"/>
        </div>
      </div>
      <div class="column is-half-tablet">
        <div class="box">
          <LineChart :chartData="yearsChartData()"/>
        </div>
      </div>
      <div class="column is-half-tablet">
        <div class="box">
          <div class="select">
            <select v-model="selectedYear" name="year" id="year">
              <option v-for="year in allYears" :value="year" :key="year">{{year}}</option>
            </select>
          </div>
          <LineChart :chartData="monthsChartData(selectedYear)" :options="startAt0()"/>
        </div>
      </div>
      <div class="column is-half-tablet">
        <div class="box">
          <BarChart :chartData="sendersBarChartData()" :options="startAt0()"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import store from '@/store';
import LineChart from '@/components/chart/LineChart.vue';
import PieChart from '@/components/chart/PieChart.vue';
import BarChart from '@/components/chart/BarChart.vue';
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

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

interface BarData {
  labels: string[];
  datasets: Dataset[];
}

@Component({
  components: {
    LineChart,
    PieChart,
    BarChart,
    ColorChooser,
  },
})
export default class Statistics extends Vue {

  private loaded: boolean = false;
  private links: Link[] = store.state.allLinks;
  private color = new ColorChooser();
  private currentYear = (new Date()).getFullYear();
  private currentMonth = (new Date()).getMonth() + 1;
  private currentMonthName = (new Date()).toLocaleString('en-us', {month: 'long'});
  private selectedYear = this.currentYear.toString();

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

  private startAt0() {
    return {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
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

  private sendersBarChartData() {
    const sendersBarData: BarData = {
      labels: [],
      datasets: [],
    };

    this.allSenders.forEach((sender, i) => sendersBarData.datasets.push(
      {
        label: sender,
        data: [],
        backgroundColor: this.color.returnColor(i),
        borderColor: this.color.returnColor(i),
    }));

    this.allYears.forEach((year) => {
      sendersBarData.labels.push(year);
      const yearLinks = this.linksForYear(this.links, year);
      this.allSenders.forEach((sender) => {
        sendersBarData.datasets.filter((dataset) => dataset.label === sender)[0].data
          .push(this.linksPerSender(yearLinks, sender).length);
      });
    });

    sendersBarData.datasets.map((dataset) => dataset.data.reverse());
    return this.createBarChart(sendersBarData);
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
    } catch (error) {
      // console.error(error);
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

  private createLineChart(lineData: ChartData[], label: string) {
    const labels = lineData.map((d) => d.label);
    const datasetsData = lineData.map((d) => d.linksSent);
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

  private createBarChart(barData: BarData) {
    return {
      labels: barData.labels.reverse(),
      datasets: barData.datasets,
    };
  }
}
</script>

<style lang="scss" scoped>

.total-links-number {
  font-size: 3rem;
}

.total-links-label {
  color: gray;
}

</style>

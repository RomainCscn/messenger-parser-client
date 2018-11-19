<template>
  <div>
    Hello
    <PieChart :chartData="data"/>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import BarChart from '@/components/BarChart.vue';
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
    BarChart,
    PieChart,
    ColorChooser,
  },
})
export default class Statistics extends Vue {

  private data = {};
  private loaded: boolean = false;
  private links: Link[] = [];
  private color = new ColorChooser();

  public mounted() {
    this.searchAll();
  }

  private fillData() {
    const years = [...new Set(this.links.map((link) => link.date.split('-')[2].slice(0, 4)))];
    const yearsData: ChartData[] = [];
    years.forEach((year) => {
      yearsData.push({label: year, linksSent: this.linksForYear(this.links, year).length });
    });
    this.createPieChart(yearsData);
  }

  private async searchAll() {
    try {
      const response = await axios.get('http://localhost:3000/search/all');
      this.links = response.data.links;

      const sendersName = [...new Set(this.links.map((link) => link.sender_name))];
      const sendersData: ChartData[] = [];
      sendersName.forEach((name) => {
        sendersData.push({label: name, linksSent: this.linksPerSender(this.links, name).length});
      });
      this.createPieChart(sendersData);

      const years = [...new Set(this.links.map((link) => link.date.split('-')[2].slice(0, 4)))];
      years.forEach((year) => {
        // console.log(year, this.linksForYear(this.links, year).length);
      });

      const monthsAndYears = [...new Set(this.links.map((link) => {
        const date = link.date.split('-');
        return date[1].concat('-' + date[2]).split(' ')[0];
      }))];
      monthsAndYears.forEach((monthAndYear) => {
        // console.log(monthAndYear, this.linksForMonth(this.links, monthAndYear).length);
      });

      sendersName.forEach((name) => {
        years.forEach((year) => {
          // console.log(name, year, this.linksForYear(this.linksPerSender(this.links, name), year).length);
        });
      });

      sendersName.forEach((name) => {
        monthsAndYears.forEach((monthAndYear) => {
          // console.log(name, monthAndYear,
          // this.linksForMonth(this.linksPerSender(this.links, name), monthAndYear).length);
        });
      });

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
    this.data = {
      labels,
      datasets: [
        {
          backgroundColor: this.color.returnColors(datasetsData.length),
          data: datasetsData,
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <tr>
    <td class="long-link"><a class="link" :href="link">{{link}}</a></td>
    <td class="small-link"><a class="link" :href="link">{{shortDomainName}}</a></td>
    <td class="sender">{{senderName}}</td>
    <td class="date">{{date}}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Link extends Vue {
  @Prop() private senderName!: string;
  @Prop() private date!: string;
  @Prop() private link!: string;

  get shortDomainName() {
    const match = this.link.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    } else {
      return null;
    }
  }
}
</script>

<style lang="scss" scoped>

.see-more {
  color: gray;
  cursor: pointer;
  font-size: 0.9rem;
}

.link {
  word-break: break-word;
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: purple !important;
  }
  &:hover {
    color: #3273dc;
    text-decoration: underline;
  }
}

.small-link {
  display: none;
}

.date {
  font-size: 0.9rem;
  white-space: nowrap;
}

.sender {
  font-size: 0.9rem;
  white-space: nowrap;
}

@media all and (max-width: 767px) {
  .link {
    white-space: nowrap;
  }

  .long-link {
    display: none;
  }

  .small-link {
    display: table-cell;
  }
}

</style>

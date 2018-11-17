<template>
  <div>
    <div>
      <a target="blank" :href="link" class="link">
        <span v-if="displayCompleteLink">
          {{link}}
        </span>
        <span v-else>
          {{shortDomainName}}
        </span>
      </a>
    </div>
    <span v-if="displayCompleteLink">
      <span class="sender">{{senderName}}</span><span class="date"> - {{date}}</span>
    </span>
    <span v-else>
      <span class="sender">{{senderName}}</span><span class="date"> - {{shortDate}}</span>
    </span>
    <span @click="showCompleteLink">
      <span v-if="displayCompleteLink" class="see-more">
        | See less
      </span>
      <span v-else class="see-more">
        | See more
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class Link extends Vue {
  @Prop() private senderName!: string;
  @Prop() private date!: string;
  @Prop() private link!: string;

  private displayCompleteLink: boolean = false;

  get shortDomainName() {
    const match = this.link.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    } else {
      return null;
    }
  }

  get shortDate() {
    const shortDate = this.date.split(' ');
    return shortDate[0];
  }

  private showCompleteLink() {
    this.displayCompleteLink = !this.displayCompleteLink;
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
  text-decoration: none;
  font-size: 1.2rem;
  color: #42b983;
  font-weight: bold;
}

.date {
  font-size: 0.9rem;
  color: gray;
}

.sender {
  font-size: 0.9rem;
}

</style>

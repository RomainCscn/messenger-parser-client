<template>
  <div>
    <div class="link">
      <a target="blank" :href="link">
        <span v-if="displayCompleteLink">
          {{link}}
        </span>
        <span v-else>
          {{shortDomainName}}
        </span>
      </a>
    </div>
    <span>
      <span v-if="displayCompleteLink">
        <br> {{senderName}} - {{date}} 
      </span>
      <span v-else>
        - {{senderName}} - {{shortDate}} 
      </span>
    </span>
    <span @click="showCompleteLink" class="see-more">
      <span v-if="displayCompleteLink">
        See less
      </span>
      <span v-else>
        See the link
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
}

</style>

<template>
  <div>
    <article class="message is-warning">
      <div class="message-body">
        {{handleError()}}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ErrorHandler extends Vue {
  @Prop() private error!: any;

  private handleError() {
    if (typeof this.error !== 'undefined') {
      if (this.error.hasOwnProperty('message')) {
        return this.error.message;
      }
   }
    if (typeof this.error.response !== 'undefined') {
      // Setup Generic Response Messages
      if (this.error.response.status === 401) {
          return 'UnAuthorized';
      } else if (this.error.response.status === 404) {
          return 'API Route is Missing or Undefined';
      } else if (this.error.response.status === 405) {
          return 'API Route Method Not Allowed';
      } else if (this.error.response.status === 422) {
          // Validation Message
      } else if (this.error.response.status >= 500) {
          return 'Server this.Error';
      }

      // Try to Use the Response Message
      if (this.error.hasOwnProperty('response') && this.error.response.hasOwnProperty('data')) {
        if (this.error.response.data.hasOwnProperty('message') && this.error.response.data.message.length > 0) {
          return this.error.response.data.message;
        }
      }
    }
  }
}
</script>

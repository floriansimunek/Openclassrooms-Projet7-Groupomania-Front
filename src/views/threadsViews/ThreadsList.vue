<template>
  <main>
    <!-- TODO: delete v-if + v-for // userId into username -->
    <ThreadInformations
      v-for="thread in threads"
      v-if="thread._id === $route.params.threadId"
      :key="thread._id"
      :name="thread.name"
      :createdAt="thread.createdAt"
      :user="thread.userId"
    />

    <!-- TODO: delete v-if + v-for -->
    <div id="threads">
      <Message
        v-for="message in messages"
        v-if="message.threadId === $route.params.threadId"
        :key="message._id"
        :subject="message.subject"
        :createdAt="message.createdAt"
        :userId="message.userId"
        :messageId="message._id"
      />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import Message from '@/components/message';
import ThreadInformations from '@/components/threadInformations';

export default {
  name: 'ThreadsList',
  components: { Message, ThreadInformations },
  data() {
    return {
      messages: [],
      threads: [],
    };
  },
  created() {
    this.fetchMessages();
    this.fetchThreads();
  },
  methods: {
    fetchThreads() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/thread',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDk3YWY0YTM2MWY2ODMxYzQ4ZDdhODIiLCJpYXQiOjE2MjA4MDc0NjgsImV4cCI6MTYyMDg5Mzg2OH0.Etrngr5ZT5p-foocf65BT3ji68_Q8Apay6vOPMjlRpY',
        },
      }).then(({ data }) => {
        this.threads = data;
      });
    },
    fetchMessages() {
      let threadId = this.$route.params.threadId;
      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}/message`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDk3YWY0YTM2MWY2ODMxYzQ4ZDdhODIiLCJpYXQiOjE2MjA4MDc0NjgsImV4cCI6MTYyMDg5Mzg2OH0.Etrngr5ZT5p-foocf65BT3ji68_Q8Apay6vOPMjlRpY',
        },
      }).then(({ data }) => {
        this.messages = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  @media screen and (min-width: 992px) {
    grid-area: main;
    overflow-y: scroll;
  }
}
</style>

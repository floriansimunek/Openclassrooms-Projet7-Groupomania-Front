<template>
  <main v-if="this.thread._id">
    <!-- TODO: userId into username -->
    <ThreadInformations
      :key="thread._id"
      :name="thread.name"
      :createdAt="thread.createdAt"
      :user="thread.userId"
    />

    <div id="threads">
      <Message
        v-for="message in messages"
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
      thread: [],
    };
  },
  created() {
    this.fetchMessages();
    this.fetchThread();
  },
  methods: {
    fetchThread() {
      let threadId = this.$route.params.threadId;
      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}`,
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      }).then(({ data }) => {
        this.thread = data;
      });
    },
    fetchMessages() {
      let threadId = this.$route.params.threadId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}/message`,
        headers: {
          Authorization: Token,
        },
      })
        .then(({ data }) => {
          this.messages = data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error.response.data.error.message);
            this.$router.push('/api/user/login');
          }
        });
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchThread();
    this.fetchMessages();
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

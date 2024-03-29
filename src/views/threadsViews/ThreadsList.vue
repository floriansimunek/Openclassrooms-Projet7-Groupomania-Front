<template>
  <main>
    <div id="threadInformations" v-if="user && thread">
      <ThreadInformations
        :key="thread._id"
        :name="thread.name"
        :description="thread.description"
        :createdAt="thread.createdAt"
        :username="user.username"
      />
    </div>

    <ThreadButtonsModal v-if="thread" :thread="thread" :message="message" />

    <div id="messages" v-if="user">
      <Message
        v-for="message in messages"
        :key="message._id"
        :subject="message.subject"
        :createdAt="message.createdAt"
        :username="user.username"
        :messageId="message._id"
        :answerMessageId="message.messageId"
      />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ThreadInformations from '@/components/thread/threadInformations';
import ThreadButtonsModal from '@/components/thread/threadButtonsModal';
import Message from '@/components/message/message';
import EventBus from '@/eventBus';

export default {
  name: 'ThreadsList',
  components: { ThreadInformations, ThreadButtonsModal, Message },
  data() {
    return {
      messages: [],
      thread: null,
      user: null,
      message: {
        subject: '',
        message: '',
      },
      comments: [],
      commentCount: '',
    };
  },
  created() {
    this.fetchThread();
    EventBus.$on('RefreshThread', this.fetchThread);
    this.fetchMessages();
    EventBus.$on('RefreshMessages', this.fetchMessages);
    this.fetchAnswers();
  },
  methods: {
    fetchThread() {
      let threadId = this.$route.params.threadId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}`,
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.thread = data;

        axios({
          method: 'get',
          url: `http://localhost:3000/api/user/${this.thread.userId}`,
          headers: {
            Authorization: Token,
          },
        }).then(({ data }) => {
          this.user = data;
        });
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
      }).then(({ data }) => {
        this.messages = data;
      });
    },
    fetchAnswers() {
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
          this.comments = data;
          for (let comment of this.comments) {
            if (comment.messageId) {
              this.commentCount++;
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
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

<template>
  <main v-if="message">
    <div id="informations-bar" v-if="user">
      <MessageInformations
        :key="message._id"
        :username="user.username"
        :subject="message.subject"
        :createdAt="message.createdAt"
      />
    </div>

    <MessageButtonsModal v-if="message" :message="message" />

    <Message v-if="message" :key="message._id" :message="message" />
  </main>
</template>

<script>
import axios from 'axios';
import MessageInformations from '@/components/message/messageInformations';
import MessageButtonsModal from '@/components/message/messageButtonsModal';
import Message from '@/components/message/inMessage';

export default {
  name: 'Messages',
  components: { MessageInformations, MessageButtonsModal, Message },
  data() {
    return {
      message: null,
      user: null,
      error: '',
      currentUserId: localStorage.getItem('userId'),
    };
  },
  created() {
    this.fetchMessage();
  },
  methods: {
    fetchMessage() {
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}`,
        headers: {
          Authorization: Token,
        },
      })
        .then(({ data }) => {
          this.message = data;

          axios({
            method: 'get',
            url: `http://localhost:3000/api/user/${this.message.userId}`,
            headers: {
              Authorization: Token,
            },
          }).then(({ data }) => {
            this.user = data;
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error.response.data.error.message);
            this.$router.push('/api/user/login');
          }
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

  /* Informations Bar */
  #informations-bar {
    background: $light-blue;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and(min-width: 992px) {
      //margin-left: 350px;
    }

    p {
      color: #fff;
      line-height: 1.3em;
      margin: 0 10px;

      &:nth-child(2) {
        text-align: right;
      }
    }
  }
}
</style>

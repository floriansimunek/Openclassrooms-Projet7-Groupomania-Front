<template>
  <main v-if="this.message._id">
    <div id="informations-bar" v-if="this.user.username">
      <MessageInformations
        :key="message._id"
        :username="user.username"
        :subject="message.subject"
        :createdAt="message.createdAt"
      />
    </div>

    <MessageButtonsModal :message="message" />

    <!-- à quoi ça sert :key ? -->
    <Message
      :key="message._id"
      :message="message.message"
      :imageUrl="message.imageUrl"
    />

    <div id="messageAnswerModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form class="messageAnswer" action="" method="post">
          <div class="messageAnswer-inputs">
            <textarea type="text" name="message" placeholder="Votre message" />
          </div>
          {{ error }}
          <div class="messageAnswer-buttons">
            <input
              class="messageAnswer-buttons__cancel"
              type="button"
              value="Annuler"
            />
            <input
              class="messageAnswer-buttons__create"
              value="Créer"
              type="button"
              v-on:click="answerMessage()"
            />
          </div>
        </form>
      </div>
    </div>
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
      message: [],
      user: [],
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
    answerMessage() {
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'post',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}`,
        headers: {
          Authorization: Token,
        },
      }).then();
    },
  },
};
</script>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  &-content {
    background-color: $darker-blue;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border-radius: 5px;
    width: 50%; /* Could be more or less, depending on screen size */
  }

  /* modals */
  .messageAnswer,
  .deleteThread,
  .modifyThread {
    color: white;
    text-align: center;

    &-form {
      margin: 0 auto;
      text-align: center;
      width: 40%;
    }

    .confirmMessage {
      color: $custom-red;
      font-size: 30px;
      text-align: center;
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      margin: 10px 0;

      input,
      textarea {
        height: 30px;
        text-align: center;
        margin: 5px auto;
        width: 50%;
        background: $light-blue;
        border: none;
        border-radius: 2px;
        color: white;
        font-size: 18px;
      }

      textarea {
        height: 150px !important;
      }

      p {
        color: white;
        margin: 0 auto;
        margin-top: 10px;
      }
    }

    &-buttons {
      text-align: center;

      input,
      p {
        width: 20%;
        height: 30px;
        color: white;
        border: none;
        border-radius: 2px;
        margin: 0 5px;
        font-size: 18px;
        text-decoration: none;
        transition: all 0.5s ease;
        margin-top: 10px;
      }

      &__cancel {
        background: $light-blue;
        &:hover {
          cursor: pointer;
          background: white;
          color: $darker-blue;
        }
      }

      &__create,
      &__modify {
        background: $custom-green;
        &:hover {
          cursor: pointer;
          background: white;
          color: $custom-green;
        }
      }

      &__delete {
        background: $custom-red;
        &:hover {
          cursor: pointer;
          background: white;
          color: $custom-red;
        }
      }
    }
  }
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

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

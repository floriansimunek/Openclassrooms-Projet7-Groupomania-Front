<template>
  <main v-if="this.thread._id">
    <div v-if="this.user.username">
      <ThreadInformations
        :key="thread._id"
        :name="thread.name"
        :createdAt="thread.createdAt"
        :username="user.username"
      />
    </div>

    <div class="addMessageBtn" id="myBtn" v-on:click="openMessageCreation()">
      Créer un message
    </div>

    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form class="messageCreation" action="" method="post">
          <div class="messageCreation-inputs">
            <input
              type="text"
              name="subject"
              placeholder="Sujet du message"
              v-model="message.subject"
            />
            <textarea
              type="text"
              name="message"
              placeholder="Votre message"
              v-model="message.message"
            />
          </div>
          <div class="messageCreation-buttons">
            <input
              class="messageCreation-buttons__cancel"
              type="button"
              value="Annuler"
            />
            <input
              class="messageCreation-buttons__create"
              value="Créer"
              type="button"
              v-on:click="createMessage()"
            />
          </div>
        </form>
      </div>
    </div>

    <div id="messages" v-if="this.user.username">
      <Message
        v-for="message in messages"
        :key="message._id"
        :subject="message.subject"
        :createdAt="message.createdAt"
        :username="user.username"
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
      user: [],
      message: {
        subject: '',
        message: '',
      },
    };
  },
  created() {
    this.fetchMessages();
    this.fetchThread();
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
    openMessageCreation() {
      let modal = document.getElementById('myModal'); // Get the modal
      let btn = document.getElementById('myBtn'); // Get the button that opens the modal
      let span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal
      let cancelBtn = document.getElementsByClassName(
        'messageCreation-buttons__cancel',
      )[0];

      // When the user clicks on the button, open the modal
      btn.onclick = function () {
        modal.style.display = 'block';
      };

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = 'none';
      };
      cancelBtn.onclick = function () {
        modal.style.display = 'none';
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    },
    createMessage() {
      let threadId = this.$route.params.threadId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'post',
        url: `http://localhost:3000/api/thread/${threadId}/message`,
        data: this.message,
        headers: {
          Authorization: Token,
        },
      })
        .then(() => {
          if (this.message.message && this.message.subject) {
            let modal = document.getElementById('myModal');
            modal.style.display = 'none';
          }
        })
        .catch((error) => {
          console.log(error);
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

.addMessageBtn {
  background: #03c946;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 30px;
  color: white;
  border: none;
  border-radius: 2px;
  margin: 10px;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    background: $light-blue;
    color: #03c946;
  }
}

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
}

/* Modal Content/Box */
.modal-content {
  background-color: $darker-blue;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border-radius: 5px;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* Message Creation System Form */
.messageCreation {
  &-form {
    margin: 0 auto;
    text-align: center;
    width: 40%;
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
    }

    &__cancel {
      background: $light-blue;
      &:hover {
        cursor: pointer;
        background: white;
        color: $darker-blue;
      }
    }

    &__create {
      background: #03c946;
      &:hover {
        cursor: pointer;
        background: white;
        color: #03c946;
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
</style>

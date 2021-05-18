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
        <form action="" method="post">
          <div class="messageCreation-inputs">
            <input
              type="text"
              name="subject"
              placeholder="Sujet du message"
              v-model="message.subject"
            />
            <input
              type="text"
              name="message"
              placeholder="Votre message"
              v-model="message.message"
            />
          </div>
          <div class="messageCreation-buttons">
            <input
              class="messageCreation-buttons"
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
    openMessageCreation() {
      // Get the modal
      let modal = document.getElementById('myModal');

      // Get the button that opens the modal
      let btn = document.getElementById('myBtn');

      // Get the <span> element that closes the modal
      let span = document.getElementsByClassName('close')[0];

      // When the user clicks on the button, open the modal
      btn.onclick = function () {
        modal.style.display = 'block';
      };

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
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
            this.$forceUpdate();
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
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
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

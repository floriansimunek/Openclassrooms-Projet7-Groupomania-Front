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

    <div class="message-buttons" v-if="message.userId === currentUserId">
      <input
        type="button"
        value="Supprimer Message"
        class="btn deleteMessageBtn"
        id="deleteMessageBtn"
        v-on:click="deleteMessageConfirmation()"
      />
      <input
        type="button"
        value="Modifier Message"
        class="btn modifyMessageBtn"
        id="modifyMessageBtn"
        v-on:click="modifyMessagePopup()"
      />
    </div>

    <!-- TODO: create component -->
    <div id="deleteMessageModal" class="modal modal-deleteMessage">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form class="deleteMessage" action="" method="post">
          <p class="confirmMessage">
            Le message va être supprimé définitivement !
          </p>
          <div class="deleteMessage-buttons">
            <input
              class="deleteMessage-buttons__cancel"
              id="deleteMessageCancelBtn"
              type="button"
              value="Annuler"
            />
            <input
              class="deleteMessage-buttons__delete"
              value="Supprimer"
              type="button"
              v-on:click="deleteMessage()"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- TODO: create component -->
    <div id="modifyMessageModal" class="modal modal-modifyMessage">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modifyMessage-inputs">
          <p>Sujet du message</p>
          <input type="text" v-model="message.subject" />
          <p>Message</p>
          <input type="text" v-model="message.message" />
        </div>
        <p id="error">{{ error }}</p>
        <div class="modifyMessage-buttons">
          <input
            class="modifyMessage-buttons__cancel"
            id="modifyMessageCancelBtn"
            type="button"
            value="Annuler"
          />
          <input
            class="modifyMessage-buttons__modify"
            value="Modifier"
            id="modifyMessageBtn"
            type="button"
            v-on:click="modifyMessage()"
          />
        </div>
      </div>
    </div>

    <div id="post-line">
      <div id="user-text-post">
        <Message :key="message._id" :message="message.message" />
        <span class="separation-line"></span>
        <div id="buttons">
          <div class="reply-btn button">Répondre</div>
          <div class="like-btn button">Like</div>
          <div class="dislike-btn button">Dislike</div>
        </div>
      </div>
      <div id="comments">
        <div class="post-comment">
          <div class="comment-infos">
            <div class="profile-picture"></div>
            <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
          </div>
          <p class="comment-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit aliquam
            pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis euismod
            urna. Montes, molestie non fusce libero tincidunt laoreet. Gravida
            interdum ullamcorper nisi quam sapien. Mi lorem morbi consectetur
            dictum sollicitudin egestas nec enim. Enim ultricies enim, eu justo
            mauris, amet. Urna tellus hac diam facilisi a. Augue varius
            phasellus risus enim.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import Message from '@/components/inMessage';
import MessageInformations from '@/components/messageInformations';

export default {
  name: 'Messages',
  components: { Message, MessageInformations },
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
    deleteMessageConfirmation() {
      let modal = document.getElementById('deleteMessageModal');
      let btn = document.getElementById('deleteMessageBtn');
      let span = document.getElementsByClassName('close')[0];
      let cancelBtn = document.getElementById('deleteMessageCancelBtn');

      btn.onclick = function () {
        modal.style.display = 'block';
      };

      span.onclick = function () {
        modal.style.display = 'none';
      };
      cancelBtn.onclick = function () {
        modal.style.display = 'none';
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    },
    deleteMessage() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;

      axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}`,
        headers: {
          Authorization: Token,
        },
      }).then(() => {
        this.$router.push(`/thread/${threadId}`);
      });
    },
    modifyMessagePopup() {
      let modal = document.getElementById('modifyMessageModal');
      let btn = document.getElementById('modifyMessageBtn');
      let span = document.getElementsByClassName('close')[0];
      let cancelBtn = document.getElementById('modifyMessageCancelBtn');

      btn.onclick = function () {
        modal.style.display = 'block';
      };

      span.onclick = function () {
        modal.style.display = 'none';
      };
      cancelBtn.onclick = function () {
        modal.style.display = 'none';
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    },
    modifyMessage() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      let threadId = this.$route.params.threadId;

      axios({
        method: 'PUT',
        url: `http://localhost:3000/api/thread/${threadId}`,
        data: this.message,
        headers: {
          Authorization: Token,
        },
      })
        .then(() => {
          let btn = document.getElementById('modifyMessageBtn');
          let modal = document.getElementById('modifyMessageModal');

          //TODO: don't work
          //TODO: refresh page
          btn.onclick = function () {
            modal.style.display = 'none';
          };
        })
        .catch((error) => {
          console.log(error);
        });
  },
};
</script>

<style lang="scss" scoped>
/* Message buttons */
.message-buttons {
  display: flex;
  flex-direction: column;

  .btn {
    width: 15%;
    height: 30px;
    border: none;
    color: white;
    border-radius: 2px;
    margin: 0 10px;
    font-size: 18px;
    text-decoration: none;
    transition: all 0.5s ease;
    margin-top: 10px;

    &:hover {
      cursor: pointer;
      background: white;
    }
  }

  .modifyMessageBtn {
    background: $dark-blue;
    &:hover {
      color: $dark-blue;
    }
  }

  .deleteMessageBtn {
    background: $custom-red;
    &:hover {
      color: $custom-red;
    }
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

  &-content {
    background-color: $darker-blue;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border-radius: 5px;
    width: 50%; /* Could be more or less, depending on screen size */
  }

  /* modals */
  .deleteMessage,
  .modifyMessage {
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

/* Post Line */
#post-line {
  #user-text-post {
    width: 90%;
    margin: 10px 0;
    margin-left: 100px;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 80%;
    }

    p {
      margin: 10px;
      overflow-wrap: break-word;
    }

    .separation-line {
      width: 300px;
    }

    #buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 15px 0;

      @media screen and(min-width: 992px) {
        justify-content: left;
        margin-left: 15px;
      }

      .button {
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px 10px;
        text-align: center;

        @media screen and(min-width: 992px) {
          margin: 0 5px;
        }
      }
    }
  }
}

/* Comments */
#comments {
  @media screen and(min-width: 992px) {
    padding-left: 10%;
  }

  .post-comment {
    width: 90%;
    margin: 15px auto;
    margin-right: 10px;
    border-radius: 5px;
    background: #fff;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 70%;
      margin-right: auto;
    }

    .comment-infos {
      display: flex;
      margin: 15px auto;
      justify-content: space-around;
      align-items: center;

      @media screen and(min-width: 992px) {
        justify-content: left;
      }

      .profile-picture {
        width: 50px;
        height: 50px;
        background: gray;

        @media screen and(min-width: 992px) {
          margin: 0 15px;
        }
      }
    }

    .comment-text {
      margin: 10px;
      text-align: justify;
    }
  }
}
</style>

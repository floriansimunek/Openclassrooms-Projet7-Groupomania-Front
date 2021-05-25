<template>
  <div>
    <div class="message-buttons" v-if="message.userId === +currentUserId">
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

    <div id="modifyMessageModal" class="modal modal-modifyMessage">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modifyMessage-inputs">
          <p>Sujet du message</p>
          <input type="text" v-model="message.subject" />
          <p>Message</p>
          <textarea type="text" v-model="message.message" />
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
  </div>
</template>

<script>
import axios from 'axios';
import EventBus from '@/eventBus';

export default {
  name: 'messageButtonsModal',
  data() {
    return {
      error: '',
      currentUserId: localStorage.getItem('userId'),
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  created() {
    EventBus.$on('RefreshMessage', this.modifyMessage);
  },
  methods: {
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
      let messageId = this.$route.params.messageId;

      axios({
        method: 'PUT',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}`,
        data: this.message,
        headers: {
          Authorization: Token,
        },
      })
        .then(() => {
          let modal = document.getElementById('modifyMessageModal');
          modal.style.display = 'none';
          EventBus.$emit('RefreshMessage');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* Message buttons */
.message-buttons {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

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

    @media screen and (max-width: 992px) {
      width: 50%;
    }

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
</style>

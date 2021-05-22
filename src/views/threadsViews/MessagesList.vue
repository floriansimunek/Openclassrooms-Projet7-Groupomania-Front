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

    <!-- TODO: display dynamic answers -->
    <!-- TODO: Create component -->
    <div id="post-line">
      <div id="user-text-post">
        <Message
          :key="message._id"
          :message="message.message"
          :imageUrl="message.imageUrl"
        />
        <span class="separation-line"></span>
        <div id="buttons">
          <!-- working buttons -->
          <input
            type="button"
            class="btn btn-reply"
            id="messageAnswerBtn"
            value="Répondre"
            v-on:click="answerMessagePopup()"
          />
          <input type="button" class="btn btn-like" value="Like" />
          <input type="button" class="btn btn-dislike" value="Dislike" />
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
    answerMessagePopup() {
      let modal = document.getElementById('messageAnswerModal'); // Get the modal
      let btn = document.getElementById('messageAnswerBtn'); // Get the button that opens the modal
      let span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal
      let cancelBtn = document.getElementsByClassName(
        'messageAnswer-buttons__cancel',
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

      .btn {
        width: 10%;
        height: 30px;
        border: none;
        color: white;
        border-radius: 2px;
        margin: 0 10px;
        font-size: 18px;
        text-decoration: none;
        transition: all 0.5s ease;
        margin-top: 10px;

        @media screen and(min-width: 992px) {
          margin: 0 5px;
        }

        &:hover {
          cursor: pointer;
          background: white;
        }

        &-reply {
          background: $dark-blue;
          &:hover {
            color: $dark-blue;
          }
        }

        &-like {
          background: $custom-green;
          &:hover {
            color: $custom-green;
          }
        }

        &-dislike {
          background: $custom-red;
          &:hover {
            color: $custom-red;
          }
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

<template>
  <div id="post-line">
    <div id="user-text-post">
      <div id="message">
        <p>{{ message.message }}</p>
        <img
          id="messageImage"
          v-if="message.imageUrl"
          :src="message.imageUrl"
        />
      </div>
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
        <input
          type="button"
          class="btn btn-like"
          id="btn-like"
          :value="likesCount + ' Like'"
          :class="{ active: hasLiked }"
          :disabled="hasDisliked"
          v-on:click="reactToMessage('like')"
        />
        <input
          type="button"
          class="btn btn-dislike"
          id="btn-dislike"
          :value="dislikesCount + ' Dislike'"
          :class="{ active: hasDisliked }"
          :disabled="hasLiked"
          v-on:click="reactToMessage('dislike')"
        />
      </div>
    </div>

    <div id="messageAnswerModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form class="messageAnswer" action="" method="post">
          <div class="messageAnswer-inputs">
            <textarea
              type="text"
              name="message"
              placeholder="Votre message"
              v-model="answerMessageDatas.message"
            />
            <div
              style="color: red"
              class="usernameInputError"
              v-if="answerMessageError.message"
            >
              {{ answerMessageError.message }}
            </div>
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
              id="answerMessageButton"
              :disabled="answerMessageError"
              v-on:click="answerMessage()"
            />
          </div>
        </form>
      </div>
    </div>

    <div id="test" v-if="this.comments.length > 0">
      <Comments
        v-for="comment in this.comments"
        :key="comment._id"
        :comment="comment.message"
        :commentMessageId="comment.messageId"
        :userId="comment.userId"
        :createdAt="comment.createdAt"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventBus from '@/eventBus';
import Comments from '@/components/message/comment';

export default {
  name: 'inMessage',
  components: { Comments },
  data() {
    return {
      error: '',
      user: '',
      currentMessage: this.$route.params.messageId,
      currentUserId: localStorage.getItem('userId'),
      comments: [],
      answerMessageDatas: {
        subject: 'answer',
        message: null,
        messageId: '',
      },
      reacts: [],
    };
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    answerMessageError() {
      if (this.answerMessageDatas.message === null) {
        return false;
      }

      if (!this.answerMessageDatas.message) {
        return {
          message: 'Le message est obligatoire',
        };
      } else if (
        !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(
          this.answerMessageDatas.message,
        )
      ) {
        return {
          message: 'Le message ne doit pas contenir de caractère spécial',
        };
      } else if (this.answerMessageDatas.message.length <= 2) {
        return {
          message: 'Le message doit être de plus de 3 caractères',
        };
      }

      return false;
    },
    hasLiked() {
      for (let react of this.reacts) {
        if (react.type === 'like' && react.userId === +this.currentUserId) {
          return true;
        }
      }
      return false;
    },
    hasDisliked() {
      for (let react of this.reacts) {
        if (react.type === 'dislike' && react.userId === +this.currentUserId) {
          return true;
        }
      }
      return false;
    },
    likesCount() {
      let likesCount = 0;
      this.reacts.forEach((react) => {
        if (react.type === 'like') likesCount++;
      });
      return likesCount;
    },
    dislikesCount() {
      let dislikesCount = 0;
      this.reacts.forEach((react) => {
        if (react.type === 'dislike') dislikesCount++;
      });
      return dislikesCount;
    },
  },
  created() {
    this.fetchAnswers();
    this.fetchReacts();
    EventBus.$on('RefreshReacts', this.fetchReacts);
    EventBus.$on('RefreshAnswers', this.fetchAnswers);
  },
  methods: {
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
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
      this.answerMessageDatas.messageId = messageId;

      axios({
        method: 'POST',
        url: `http://localhost:3000/api/thread/${threadId}/message`,
        data: this.answerMessageDatas,
        headers: {
          Authorization: Token,
        },
      }).then(() => {
        let modal = document.getElementById('messageAnswerModal');
        modal.style.display = 'none';
        EventBus.$emit('RefreshAnswers');
      });
    },
    reactToMessage(reactType) {
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;
      let Token = 'Bearer ' + localStorage.getItem('Token');

      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}/react`,
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        let reactsArray = data;

        for (let i = 0; i < reactsArray.length; i++) {
          if (
            reactsArray[i].userId === +this.currentUserId &&
            reactType === reactsArray[i].type
          ) {
            axios({
              method: 'delete',
              url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}/react/${reactsArray[i]._id}`,
              headers: {
                Authorization: Token,
              },
            }).then(() => {
              EventBus.$emit('RefreshReacts');
            });
            return;
          }
        }

        axios({
          method: 'post',
          url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}/react`,
          data: { type: reactType },
          headers: {
            Authorization: Token,
          },
        }).then(() => {
          EventBus.$emit('RefreshReacts');
        });
      });
    },
    fetchReacts() {
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;
      let Token = 'Bearer ' + localStorage.getItem('Token');

      axios({
        method: 'get',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}/react`,
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.reacts = data;
      });
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
  .messageAnswer {
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
        &:disabled {
          opacity: 0.6;
        }

        &:not(:disabled):hover {
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

#message {
  margin: 10px;

  p {
    overflow-wrap: break-word;
  }

  &Image {
    height: 30%;
    width: 30%;
    margin: 20px auto;
    display: block;
  }
}

/* Post Line */
#post-line {
  width: 100%;
  height: $screen-height-size;

  #user-text-post {
    width: 90%;
    margin: 10px 0;
    margin-left: 100px;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;

    @media screen and (min-width: 992px) {
      width: 80%;
    }

    @media screen and (max-width: 992px) {
      margin-left: 15px;
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

        @media screen and (min-width: 992px) {
          margin: 0 5px;
        }

        @media screen and (max-width: 992px) {
          width: 30%;
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
          border: 2px $custom-green solid;
          color: $custom-green;

          &:disabled {
            opacity: 0.6;
          }

          &:not(:disabled):hover {
            background: $custom-green;
            color: white;
          }

          &.active {
            background: $custom-green;
            color: white;
          }
        }

        &-dislike {
          border: 2px $custom-red solid;
          color: $custom-red;

          &:disabled {
            opacity: 0.6;
          }

          &:not(:disabled):hover {
            background: $custom-red;
            color: white;
          }

          &.active {
            background: $custom-red;
            color: white;
          }
        }
      }
    }
  }
}
</style>

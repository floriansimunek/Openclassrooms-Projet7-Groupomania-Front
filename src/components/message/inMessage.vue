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
          value="Like"
          v-on:click="reactToMessage('like')"
        />
        <input
          type="button"
          class="btn btn-dislike"
          value="Dislike"
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
              v-on:click="answerMessage()"
            />
          </div>
        </form>
      </div>
    </div>

    <div id="comments" :key="comment._id" v-for="comment in comments">
      <div class="post-comment" v-if="comment.messageId == currentMessage">
        <div class="comment-infos">
          <div class="profile-picture"></div>
          <p>
            Écrit par {{ comment.userId }} •
            {{
              new Date(Date.parse(comment.createdAt))
                .toLocaleDateString('fr', {
                  hour: 'numeric',
                  minute: 'numeric',
                })
                .replace(':', 'h')
            }}
          </p>
        </div>
        <p class="comment-text">
          {{ comment.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'inMessage',
  data() {
    return {
      error: '',
      user: '',
      currentMessage: this.$route.params.messageId,
      comments: '',
      answerMessageDatas: {
        subject: '.',
        message: '',
        messageId: '',
      },
      react: {
        type: '',
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
  created() {
    this.fetchAnswers();
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

          // TODO: get user
          axios({
            method: 'get',
            url: `http://localhost:3000/api/user/${this.comments[0].userId}`,
            headers: {
              Authorization: Token,
            },
          }).then(({ data }) => {
            this.user = data;
          });
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
      });
    },
    reactToMessage(reactType) {
      let threadId = this.$route.params.threadId;
      let messageId = this.$route.params.messageId;
      let Token = 'Bearer ' + localStorage.getItem('Token');
      this.react.type = reactType;

      axios({
        method: 'POST',
        url: `http://localhost:3000/api/thread/${threadId}/message/${messageId}/react`,
        data: this.react,
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        console.log(data);
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
          border: 2px $custom-green solid;
          color: $custom-green;

          &:hover {
            background: $custom-green;
            color: white;
          }
        }

        &-dislike {
          border: 2px $custom-red solid;
          color: $custom-red;

          &:hover {
            background: $custom-red;
            color: white;
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

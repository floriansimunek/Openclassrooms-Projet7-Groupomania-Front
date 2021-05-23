<template>
  <div id="post-line">
    <div id="user-text-post">
      <div id="message">
        <p>{{ message }}</p>
        <img id="messageImage" v-if="imageUrl" :src="imageUrl" />
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
        <input type="button" class="btn btn-like" value="Like" />
        <input type="button" class="btn btn-dislike" value="Dislike" />
      </div>
    </div>

    <!-- TODO: display dynamic answers -->
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
          mauris, amet. Urna tellus hac diam facilisi a. Augue varius phasellus
          risus enim.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
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

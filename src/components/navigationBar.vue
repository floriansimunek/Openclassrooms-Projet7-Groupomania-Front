<template>
  <div id="navigation-bar">
    <UserInformations />
    <div class="buttons">
      <router-link
        :to="{
          name: 'UserProfile',
        }"
        ><input class="btn btn-profile" value="Profil" />
      </router-link>
      <input
        class="btn btn-logout"
        value="Déconnexion"
        v-on:click="userLogout()"
      />
    </div>
    <span class="separation-line"></span>

    <input
      type="button"
      class="btn btn__create"
      value="Créer un thread"
      id="threadCreationBtn"
      v-on:click="threadCreationPopup()"
    />

    <div id="threadCreationModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <form class="threadCreation" action="" method="post">
          <div class="threadCreation-inputs">
            <input
              type="text"
              name="threadName"
              placeholder="Nom du thread"
              v-model="thread.name"
            />
            <div
              style="color: red"
              class="threadInputError"
              v-if="threadNameError.message"
            >
              {{ threadNameError.message }}
            </div>
            <input
              type="text"
              name="message"
              placeholder="Description"
              v-model="thread.description"
            />
            <div
              style="color: red"
              class="threadInputError"
              v-if="threadDescritionError.message"
            >
              {{ threadDescritionError.message }}
            </div>
          </div>
          {{ error }}
          <div class="threadCreation-buttons">
            <input
              class="threadCreation-buttons__cancel"
              type="button"
              value="Annuler"
            />
            <input
              class="threadCreation-buttons__create"
              value="Créer"
              type="button"
              :disabled="threadError"
              v-on:click="createThread()"
            />
          </div>
        </form>
      </div>
    </div>

    <ul id="favs">
      <p>Threads</p>
      <Thread
        v-for="thread in threads"
        :key="thread._id"
        :name="thread.name"
        :threadId="thread._id"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Thread from '@/components/thread/thread';
import UserInformations from '@/components/user/user';
import EventBus from '@/eventBus';

export default {
  name: 'navigation-bar',
  components: { Thread, UserInformations },
  data() {
    return {
      threads: [],
      thread: {
        name: null,
        description: null,
      },
      error: '',
    };
  },
  created() {
    this.fetchThreads();
    EventBus.$on('RefreshThread', this.fetchThreads);
  },
  computed: {
    threadError() {
      if (this.threadNameError.message || this.threadDescritionError.message) {
        return true;
      }
      return false;
    },
    threadNameError() {
      if (this.thread.name === null) {
        return false;
      }

      if (!this.thread.name) {
        return {
          message: 'Le nom est obligatoire',
        };
      } else if (
        !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(this.thread.name)
      ) {
        return {
          message: 'Le nom ne doit pas contenir de caractère spécial',
        };
      } else if (this.thread.name.length <= 2) {
        return {
          message: 'Le nom doit être de plus de 3 caractères',
        };
      }

      return false;
    },
    threadDescritionError() {
      if (this.thread.description === null) {
        return false;
      }

      if (!this.thread.description) {
        return {
          message: 'Le nom est obligatoire',
        };
      } else if (
        !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(
          this.thread.description,
        )
      ) {
        return {
          message: 'Le nom ne doit pas contenir de caractère spécial',
        };
      } else if (this.thread.description.length <= 2) {
        return {
          message: 'Le nom doit être de plus de 3 caractères',
        };
      }

      return false;
    },
  },
  methods: {
    fetchThreads() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/thread',
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.threads = data;
      });
    },
    userLogout() {
      localStorage.removeItem('Token');
      localStorage.removeItem('userId');
      this.$router.push('/login');
    },
    threadCreationPopup() {
      let modal = document.getElementById('threadCreationModal'); // Get the modal
      let btn = document.getElementById('threadCreationBtn'); // Get the button that opens the modal
      let span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal
      let cancelBtn = document.getElementsByClassName(
        'threadCreation-buttons__cancel',
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
    createThread() {
      let Token = 'Bearer ' + localStorage.getItem('Token');

      axios({
        method: 'post',
        url: `http://localhost:3000/api/thread/`,
        data: this.thread,
        headers: {
          Authorization: Token,
        },
      }).then(() => {
        let modal = document.getElementById('threadCreationModal');
        modal.style.display = 'none';
        EventBus.$emit('RefreshThread');
      });
    },
  },
};
</script>

<style lang="scss">
#navigation-bar {
  position: fixed;
  width: 100%;
  height: $screen-height-size;
  left: 0;
  top: 75px;
  background: $dark-blue;
  transform: translate(-100vh, 0);
  transition: all 0.5s ease-in-out;
  padding: 20px;
  color: #fff;

  @media screen and (min-width: 992px) {
    transform: initial;
    width: 350px;
    position: static;
    grid-area: sidebar;
  }

  #favs {
    list-style: none;
    margin-top: 20px;

    a {
      text-decoration: none;
      color: #fff;
    }

    li {
      background: $light-blue;
      border-radius: 5px;
      margin-top: 10px;
      padding: 7px 10px;

      &:hover {
        background: $transparent-light-blue;
      }
    }
  }
}

.btn {
  &__create {
    display: block;
    width: 50%;
    height: 30px;
    color: white;
    border: none;
    border-radius: 2px;
    margin: 0 auto;
    font-size: 18px;
    text-decoration: none;
    transition: all 0.5s ease;
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
}

.buttons {
  display: flex;
  flex-direction: column;
  text-align: center;

  .btn {
    width: 50%;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    padding: 7px 0;
    margin: 5px auto;
    text-align: center;
    background: $darker-blue;
    transition: all 0.5s ease;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
      color: $darker-blue;
    }

    &-logout {
      color: $custom-red;

      &:hover {
        background: $custom-red;
      }
    }

    &-profile {
      color: white;

      &:hover {
        background: white;
      }
    }
  }
}

.separation-line {
  display: block;
  margin: 20px auto;
  width: 80%;
  height: 1px;
  background-color: $light-blue;
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
  .threadCreation,
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
</style>

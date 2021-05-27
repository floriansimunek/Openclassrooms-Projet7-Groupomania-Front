<template>
  <div class="home">
    <Layout />
    <main>
      <div class="userProfile">
        <div class="userProfile-image"></div>
        <div class="userProfile-informations">
          <strong>Nom d'utilisateur:</strong> {{ this.user.username }} <br />
          <strong>Adresse email:</strong> {{ this.user.email }} <br />
          <strong>Création du compte:</strong>
          {{
            new Date(Date.parse(this.user.createdAt))
              .toLocaleDateString('fr', {
                hour: 'numeric',
                minute: 'numeric',
              })
              .replace(':', 'h')
          }}
        </div>
        <div class="userProfile-buttons">
          <input
            type="button"
            value="Supprimer le compte"
            class="btn btn-delete"
            id="deleteUserBtn"
            v-on:click="deleteUserConfirmation()"
          />
          <input
            type="button"
            value="Modifier les informations"
            class="btn btn-modify"
            id="modifyUserBtn"
            v-on:click="modifyUserPopup()"
          />
        </div>
      </div>

      <div id="deleteUserModal" class="modal modal-delete-user">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p class="confirmMessage">
            Votre compte va être supprimé définitivement !
          </p>
          <div class="deleteUser-buttons">
            <input
              class="deleteUser-buttons__cancel"
              id="deleteUserCancelBtn"
              type="button"
              value="Annuler"
            />
            <input
              class="deleteUser-buttons__delete"
              value="Supprimer"
              type="button"
              v-on:click="deleteUser()"
            />
          </div>
        </div>
      </div>

      <div id="modifyUserModal" class="modal modal-modify-user">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div class="modifyUser-inputs">
            <p>Nom d'utilisateur</p>
            <input type="text" v-model="user.username" />
            <div
              style="color: red"
              class="usernameInputError"
              v-if="usernameError.message"
            >
              {{ usernameError.message }}
            </div>
            <p>Email</p>
            <input type="text" v-model="user.email" />
            <div
              style="color: red"
              class="emailInputError"
              v-if="emailError.message"
            >
              {{ emailError.message }}
            </div>
            <p>Mot de passe</p>
            <input type="password" v-model="user.password" />
            <div
              style="color: red"
              class="passwordInputError"
              v-if="passwordError.message"
            >
              {{ passwordError.message }}
            </div>
            <p>Confirmation mot de passe</p>
            <input type="password" v-model="user.confirmPassword" />
            <div
              style="color: red"
              class="confirmPasswordInputError"
              v-if="confirmPasswordError.message"
            >
              {{ confirmPasswordError.message }}
            </div>
          </div>
          <p id="error">{{ error }}</p>
          <div class="modifyUser-buttons">
            <input
              class="modifyUser-buttons__cancel"
              id="modifyUserCancelBtn"
              type="button"
              value="Annuler"
            />
            <input
              class="modifyUser-buttons__modify"
              value="Modifier"
              id="userModifyConfirmBtn"
              type="button"
              v-on:click="modifyUser()"
              :disabled="inputsError"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Layout from '@/components/layout';

export default {
  name: 'userProfileDisplay',
  components: { Layout },
  data() {
    return {
      user: [],
      error: '',
    };
  },
  created() {
    this.getUserProfile();
  },
  computed: {
    inputsError() {
      if (
        this.usernameError.message ||
        this.emailError.message ||
        this.passwordError.message ||
        this.confirmPasswordError.message
      ) {
        return true;
      }
      return false;
    },
    usernameError() {
      if (this.user.username === null) {
        return false;
      }

      if (!this.user.username) {
        return {
          message: "Le nom d'utilsateur est obligatoire",
        };
      } else if (typeof this.user.username !== 'string') {
        return {
          message:
            "Merci de préciser un nom d'utilisateur valide (chaîne de caractères) eazeazez",
        };
      } else if (this.user.username.length <= 1) {
        return {
          message:
            "Merci de préciser un nom d'utilisateur valide (2 caractères ou plus)",
        };
      }

      return false;
    },
    emailError() {
      if (this.user.email === null) {
        return false;
      }

      if (!this.user.email) {
        return {
          message: 'Merci de saisir une adresse mail',
        };
      } else if (typeof this.user.email !== 'string') {
        return {
          message:
            'Merci de saisir une adresse mail valide (chaîne de caractères au format example@domaine.ext)',
        };
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.user.email,
        )
      ) {
        return {
          message:
            'Merci de saisir une adresse mail valide (chaîne de caractères au format example@domaine.ext)',
        };
      }

      return false;
    },
    passwordError() {
      if (this.user.password === null) {
        return false;
      }

      if (typeof this.user.password !== 'string') {
        return {
          message:
            'Merci de saisir un mot de passe valide (chaîne de caractères)',
        };
      } else if (this.user.password.length <= 5) {
        return {
          message:
            'Merci de saisir un mot de passe de plus de 6 caractères ou plus',
        };
      }

      return false;
    },
    confirmPasswordError() {
      if (this.user.confirmPassword === null) {
        return false;
      }

      if (typeof this.user.confirmPassword !== 'string') {
        return {
          message:
            'Merci de saisir un mot de passe valide (chaîne de caractères)',
        };
      } else if (this.user.confirmPassword.length <= 5) {
        return {
          message:
            'Merci de saisir un mot de passe de plus de 6 caractères ou plus',
        };
      } else if (this.user.password !== this.user.confirmPassword) {
        return {
          message: 'Les deux mots de passes ne correspondent pas',
        };
      }

      return false;
    },
  },
  methods: {
    getUserProfile() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/me',
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.user = data;
      });
    },
    deleteUserConfirmation() {
      let modal = document.getElementById('deleteUserModal');
      let btn = document.getElementById('deleteUserBtn');
      let span = document.getElementsByClassName('close')[0];
      let cancelBtn = document.getElementById('deleteUserCancelBtn');

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
    deleteUser() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      let userId = localStorage.getItem('userId');
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/api/user/${userId}`,
        headers: {
          Authorization: Token,
        },
      }).then(() => {
        localStorage.removeItem('Token');
        localStorage.removeItem('userId');
        this.$router.push('/login');
      });
    },
    modifyUserPopup() {
      let modal = document.getElementById('modifyUserModal');
      let btn = document.getElementById('modifyUserBtn');
      let span = document.getElementsByClassName('close')[1];
      let cancelBtn = document.getElementById('modifyUserCancelBtn');

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
    modifyUser() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      let userId = localStorage.getItem('userId');

      axios({
        method: 'PUT',
        url: `http://localhost:3000/api/user/${userId}`,
        data: this.user,
        headers: {
          Authorization: Token,
        },
      })
        .then(() => {
          let modal = document.getElementById('modifyUserModal');
          modal.style.display = 'none';
        })
        .catch((error) => {
          this.error =
            error.response.status + ' - ' + error.response.data.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: rgba(44, 61, 85, 0.05);
  padding-top: 75px;
  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-template-rows: 75px 1fr;
    grid-template-areas:
      'header header'
      'sidebar main';
    max-height: 100vh;
    padding-top: 0;
  }
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

/* User Profile */
.userProfile {
  background: $darker-blue;
  border-radius: 5px;
  width: 50%;
  margin: 10% auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-image {
    height: 100px;
    width: 100px;
    background: gray;
    align-self: center;
    margin: 20px;
  }

  &-informations {
    align-self: center;
    margin: 20px;
    line-height: 1.5em;
    color: white;
  }

  &-buttons {
    text-align: center;
    margin-bottom: 20px;
    .btn {
      width: 30%;
      height: 30px;
      color: white;
      border: none;
      border-radius: 2px;
      margin: 0 5px;
      font-size: 18px;
      text-decoration: none;
      transition: all 0.5s ease;
      margin-top: 10px;
      text-align: center;

      &:hover {
        cursor: pointer;
      }

      &-delete {
        background: $custom-red;
      }

      &-modify {
        background: $custom-green;
      }
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

    .confirmMessage {
      color: $custom-red;
      font-size: 30px;
      text-align: center;
    }
  }

  .modifyUser-inputs {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    color: white;
    text-align: center;

    input {
      height: 30px;
      color: white;
      text-align: center;
      margin: 5px auto;
      width: 50%;
      background: $light-blue;
      border: none;
      border-radius: 2px;
      font-size: 18px;
    }
  }

  .modifyUser-buttons,
  .deleteUser-buttons {
    color: white;
    text-align: center;

    input {
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

    &__delete {
      background: $custom-red;
      &:hover {
        cursor: pointer;
        background: white;
        color: $custom-red;
      }
    }

    &__modify {
      background: $custom-green;
      &:hover {
        cursor: pointer;
        background: white;
        color: $custom-green;
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

#error {
  color: white;
  text-align: center;
}
</style>

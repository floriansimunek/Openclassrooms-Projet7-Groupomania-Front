<template>
  <div class="login-form">
    <header>
      <h1>Groupomania</h1>
    </header>
    <div class="user-system">
      <div class="user-system-form">
        <h2>Connexion</h2>
        <form action="" method="post">
          <div class="user-system-inputs">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              v-model="user.email"
            />
            <div
              style="color: red"
              class="emailInputError"
              v-if="emailError.message"
            >
              {{ emailError.message }}
            </div>
            <label for="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              v-model="user.password"
            />
            <div
              style="color: red"
              class="passwordInputError"
              v-if="passwordError.message"
            >
              {{ passwordError.message }}
            </div>
          </div>
          <p style="color: red">{{ error }}</p>
          <div class="user-system-buttons">
            <input
              class="user-system-buttons-user-system"
              value="Se connecter"
              type="button"
              v-on:click="loginUser()"
              :disabled="inputsError"
            />
            <router-link
              :to="{
                name: 'Register',
              }"
              tag="p"
            >
              <input
                class="user-system-buttons-register"
                type="button"
                value="S'inscrire"
              />
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      error: '',
    };
  },
  computed: {
    inputsError() {
      if (this.emailError.message || this.passwordError.message) {
        return true;
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
  },
  methods: {
    loginUser() {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/user/login`,
        data: this.user,
      })
        .then(({ data }) => {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('Token', data.accessToken);
          this.$router.push('/');
        })
        .catch((error) => {
          this.error =
            error.response.status + ' - ' + error.response.data.error;
        });
    },
  },
};
</script>

<style lang="scss">
/* Header */
header {
  background-color: $darker-blue;
  color: #fff;
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 100px;

  @media screen and (min-width: 992px) {
    grid-area: header;
    padding-left: 0;
  }

  h1 {
    margin-right: 60px;

    @media screen and (min-width: 992px) {
      margin-left: 20px;
    }
  }
}

/* User System Form */
.user-system {
  position: fixed;
  width: 100%;
  height: $screen-height-size;
  left: 0;
  top: 75px;
  background: $dark-blue;
  transition: all 0.5s ease-in-out;
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;

  &-form {
    margin: 0 auto;
    text-align: center;
    width: 40%;
  }

  &-inputs {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    input {
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
  }

  &-buttons {
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

    &-user-system {
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

    &-register {
      background: $darker-blue;

      &:disabled {
        opacity: 0.6;
      }

      &:not(:disabled):hover {
        cursor: pointer;
        background: white;
        color: $darker-blue;
      }
    }
  }
}
</style>

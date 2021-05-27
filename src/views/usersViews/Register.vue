<template>
  <div class="register-form">
    <header>
      <h1>Groupomania</h1>
    </header>

    <div class="user-system">
      <div class="user-system-form">
        <h2>S'inscrire</h2>
        <form action="" method="post">
          <div class="user-system-inputs">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              v-model="user.username"
            />
            <div
              style="color: red"
              class="usernameInputError"
              v-if="usernameError.message"
            >
              {{ usernameError.message }}
            </div>
            <label for="email">Email</label>
            <input
              type="text"
              name="mail"
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
            <label for="confirmPassword">Confirmation mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmation mot de passe"
              v-model="user.confirmPassword"
            />
            <div
              style="color: red"
              class="confirmPasswordInputError"
              v-if="confirmPasswordError.message"
            >
              {{ confirmPasswordError.message }}
            </div>
          </div>
          <p style="color: red">{{ error }}</p>
          <div class="user-system-buttons">
            <input
              class="user-system-buttons-register"
              type="button"
              value="S'inscrire"
              v-on:click="registerUser()"
              :disabled="inputsError"
            />
            <router-link :to="{ name: 'Login' }" tag="p">
              <input
                class="user-system-buttons-user-system"
                type="submit"
                value="Se connecter"
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
  name: 'Register',
  data() {
    return {
      user: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      error: '',
    };
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
    registerUser() {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/user/register`,
        data: this.user,
      })
        .then(({ data }) => {
          localStorage.setItem('userId', data.user.userId);
          localStorage.setItem('Token', data.accessToken);
          this.$router.push('/');
        })
        .catch((error) => {
          this.error =
            error.response.status + ' - ' + error.response.data.message;
        });
    },
  },
};
</script>

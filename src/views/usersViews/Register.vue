<template>
  <div class="register-form">
    <header>
      <h1>Groupomania</h1>
    </header>

    <div class="user-system">
      <div class="user-system-form">
        <h2>S'inscrire</h2>
        <form action="" method="post">
          <!-- TODO: @change on parent ? -->
          <div class="user-system-inputs">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              ref="userUsername"
              v-on:change="getUserInputValue()"
            />
            <input
              type="text"
              name="mail"
              placeholder="Email"
              ref="userEmail"
              v-on:change="getUserInputValue()"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              ref="userPassword"
              v-on:change="getUserInputValue()"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmation mot de passe"
              ref="userConfirmPassword"
              v-on:change="getUserInputValue()"
            />
          </div>
          <div class="user-system-buttons">
            <router-link :to="{ name: 'Login' }">
              <input
                class="user-system-buttons-user-system"
                type="submit"
                value="Se connecter"
              />
            </router-link>
            <input
              class="user-system-buttons-register"
              type="button"
              value="S'inscrire"
              v-on:click="registerUser()"
            />
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    getUserInputValue() {
      this.user.username = this.$refs.userUsername.value;
      this.user.email = this.$refs.userEmail.value;
      this.user.password = this.$refs.userPassword.value;
      this.user.confirmPassword = this.$refs.userConfirmPassword.value;
    },
    registerUser() {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/user/register`,
        data: this.user,
      }).then(({ data }) => {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('Token', data.accessToken);
      });
    },
  },
};
</script>

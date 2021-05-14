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
            <!-- TODO: @change on parent ? -->
            <input
              type="text"
              name="email"
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
          </div>
          <div class="user-system-buttons">
            <router-link
              :to="{
                name: 'Register',
              }"
            >
              <input
                class="user-system-buttons-register"
                type="submit"
                value="S'inscrire"
              />
            </router-link>
            <input
              class="user-system-buttons-user-system"
              value="Se connecter"
              type="button"
              v-on:click="loginUser()"
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
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    getUserInputValue() {
      this.user.email = this.$refs.userEmail.value;
      this.user.password = this.$refs.userPassword.value;
    },
    loginUser() {
      axios({
        method: 'post',
        url: `http://localhost:3000/api/user/login`,
        data: this.user,
      }).then(({ data }) => {
        console.log(data.userId);
        localStorage.setItem('userId', data.userId);
        console.log(data.accessToken);
        localStorage.setItem('Token', data.accessToken);
      });
    },
  },
};
</script>

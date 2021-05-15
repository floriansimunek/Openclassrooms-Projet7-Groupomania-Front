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
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref="userEmail"
              v-model="user.email"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              ref="userPassword"
              v-model="user.password"
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
          console.log(
            error.response.status + ' - ' + error.response.data.error,
          );
        });
    },
  },
};
</script>

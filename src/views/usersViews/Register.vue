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
            <label for="email">Email</label>
            <input
              type="text"
              name="mail"
              id="email"
              placeholder="Email"
              v-model="user.email"
            />
            <label for="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              v-model="user.password"
            />
            <label for="confirmPassword">Confirmation mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmation mot de passe"
              v-model="user.confirmPassword"
            />
          </div>
          {{ error }}
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
      error: '',
    };
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

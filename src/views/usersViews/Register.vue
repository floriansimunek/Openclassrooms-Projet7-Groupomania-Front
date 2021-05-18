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
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              v-model="user.username"
            />
            <input
              type="text"
              name="mail"
              placeholder="Email"
              v-model="user.email"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              v-model="user.password"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmation mot de passe"
              v-model="user.confirmPassword"
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
          console.log(
            error.response.status + ' - ' + error.response.data.error,
          );
        });
    },
  },
};
</script>

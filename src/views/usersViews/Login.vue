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
              v-model="user.email"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              v-model="user.password"
            />
          </div>
          {{ error }}
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
      error: '',
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

    &-user-system {
      background: $custom-green;
      &:hover {
        cursor: pointer;
        background: white;
        color: $custom-green;
      }
    }

    &-register {
      background: $darker-blue;
      &:hover {
        cursor: pointer;
        background: white;
        color: $darker-blue;
      }
    }
  }
}
</style>

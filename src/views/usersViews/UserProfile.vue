<template>
  <div class="home">
    <Layout />
    <main>
      <div class="userProfile">
        <div class="userProfile-image"></div>
        <div class="userProfile-informations">
          <strong>Nom d'utilisateur:</strong> {{ this.user.username }} <br />
          <strong>Adresse email:</strong> {{ this.user.email }} <br />
          <strong>Création du compte :</strong>
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
            type="text"
            value="Supprimer le compte"
            class="btn btn-delete"
          />
          <input
            type="text"
            value="Modifier les informations"
            class="btn btn-modify"
          />
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
    };
  },
  created() {
    this.getUserProfile();
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

.userProfile {
  background: $darker-blue;
  border-radius: 5px;
  width: 50%;
  margin: 20% auto;
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

      &-delete {
        background: #ff4747;
      }

      &-modify {
        background: #03c946;
      }
    }
  }
}
</style>

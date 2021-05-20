<template>
  <div class="home">
    <Layout />
    <main>
      <div class="viewAllUsers">
        <UsersCard
          v-for="user in users"
          :key="user._id"
          :username="user.username"
          :email="user.email"
          :createdAt="user.createdAt"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Layout from '@/components/layout.vue';
import UsersCard from '@/components/user/allUsersCard.vue';

export default {
  name: 'viewAllUsers',
  data() {
    return {
      users: [],
    };
  },
  components: { Layout, UsersCard },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/user',
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.users = data;
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

.viewAllUsers {
  height: $screen-height-size;
  display: flex;
  flex-wrap: wrap;
}
</style>

<template>
  <div class="home">
    <Layout />
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
    //this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: 'http://localhost:3000/user/me',
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        console.log(this.user);
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
</style>

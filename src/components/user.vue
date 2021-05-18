<template>
  <div id="user">
    <p id="user-infos">
      {{ user.username }} <br />{{ user.email }} •
      {{ new Date(Date.parse(user.createdAt)).toLocaleDateString('fr') }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'user-informations',
  data() {
    return {
      user: [],
    };
  },
  created() {
    this.getUserInformations();
  },
  methods: {
    getUserInformations() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      let userId = localStorage.getItem('userId');
      axios({
        method: 'get',
        url: `http://localhost:3000/api/user/${userId}`,
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

<style lang="scss">
#user {
  line-height: 1.5em;
  margin-bottom: 20px;

  #connection-state {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #03c946;
    border-radius: 50%;
    transform: translate(0, 2px);
  }
}
</style>

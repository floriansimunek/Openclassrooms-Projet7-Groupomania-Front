<template>
  <div id="navigation-bar">
    <UserInformations />
    <div class="buttons">
      <router-link
        :to="{
          name: 'UserProfile',
        }"
        ><input class="btn btn-profile" value="Profil" />
      </router-link>
      <input
        class="btn btn-logout"
        value="Déconnexion"
        v-on:click="userLogout()"
      />
    </div>
    <span class="separation-line"></span>
    <ul id="favs">
      <p>Threads</p>
      <Thread
        v-for="thread in threads"
        :key="thread._id"
        :name="thread.name"
        :threadId="thread._id"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Thread from '@/components/thread';
import UserInformations from '@/components/user';

export default {
  name: 'navigation-bar',
  components: { Thread, UserInformations },
  data() {
    return {
      threads: [],
    };
  },
  created() {
    this.fetchThreads();
  },
  methods: {
    fetchThreads() {
      let Token = 'Bearer ' + localStorage.getItem('Token');
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/thread',
        headers: {
          Authorization: Token,
        },
      }).then(({ data }) => {
        this.threads = data;
      });
    },
    userLogout() {
      localStorage.removeItem('Token');
      localStorage.removeItem('userId');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
#navigation-bar {
  position: fixed;
  width: 100%;
  height: $screen-height-size;
  left: 0;
  top: 75px;
  background: $dark-blue;
  transform: translate(-100vh, 0);
  transition: all 0.5s ease-in-out;
  padding: 20px;
  color: #fff;

  @media screen and (min-width: 992px) {
    transform: initial;
    width: 350px;
    position: static;
    grid-area: sidebar;
  }

  #favs {
    list-style: none;
    margin-top: 20px;

    a {
      text-decoration: none;
      color: #fff;
    }

    li {
      background: $light-blue;
      border-radius: 5px;
      margin-top: 10px;
      padding: 7px 10px;

      &:hover {
        background: $transparent-light-blue;
      }
    }
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  text-align: center;

  .btn {
    width: 50%;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    padding: 7px 0;
    margin: 5px auto;
    text-align: center;
    background: $darker-blue;
    transition: all 0.5s ease;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
      color: $darker-blue;
    }

    &-logout {
      color: #ff4747;

      &:hover {
        background: #ff4747;
      }
    }

    &-profile {
      color: white;

      &:hover {
        background: white;
      }
    }
  }
}

.separation-line {
  display: block;
  margin: 20px auto;
  width: 80%;
  height: 1px;
  background-color: $light-blue;
}
</style>

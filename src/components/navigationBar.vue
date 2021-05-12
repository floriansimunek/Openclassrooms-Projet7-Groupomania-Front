<template>
  <div id="navigation-bar">
    <div id="user">
      <p id="user-infos">
        Florian <br />u/Flo_SMNK • Connecté
        <span id="connection-state"></span>
      </p>
    </div>
    <span class="separation-line"></span>
    <ul id="favs">
      <p>Favoris</p>
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

export default {
  name: 'navigation-bar',
  components: { Thread },
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
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/thread',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDk3YWY0YTM2MWY2ODMxYzQ4ZDdhODIiLCJpYXQiOjE2MjA4MDc0NjgsImV4cCI6MTYyMDg5Mzg2OH0.Etrngr5ZT5p-foocf65BT3ji68_Q8Apay6vOPMjlRpY',
        },
      }).then(({ data }) => {
        this.threads = data;
      });
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
</style>

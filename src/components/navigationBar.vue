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
import Thread from '@/components/thread';

export default {
  name: 'navigation-bar',
  components: { Thread },
  data() {
    return {
      threads: [
        {
          _id: '6097af4e361f6831c48d7a83',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-09T09:45:50.224Z',
        },
        {
          _id: '6097d2472d6ac23b78fb91c5',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name 2',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-09T12:15:03.018Z',
        },
        {
          _id: '6097d24a2d6ac23b78fb91c6',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name 3',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-09T12:15:06.244Z',
        },
        {
          _id: '6097d24d2d6ac23b78fb91c7',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name 4',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-09T12:15:09.437Z',
        },
        {
          _id: '6097d2502d6ac23b78fb91c8',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name 5',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-09T12:15:12.180Z',
        },
      ],
    };
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

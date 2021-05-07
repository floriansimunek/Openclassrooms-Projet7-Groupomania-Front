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
      <a href="/threads"><li class="sub-fav-01">s/WebDevelopment</li></a>
      <li class="sub-fav-02">s/SpaceX</li>
      <li class="sub-fav-03">s/ProgrammerHumor</li>
      <li class="sub-fav-04">s/Openclassrooms</li>
      <li class="sub-fav-05">s/Github</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigation-bar',
};
</script>

<style lang="scss" scoped>
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

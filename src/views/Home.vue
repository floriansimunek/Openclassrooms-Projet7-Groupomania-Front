<template>
  <div class="home">
    <header>
      <h1>Groupomania</h1>
    </header>

    <input type="checkbox" />
    <div class="burger-menu">
      <div class="burger-menu-line__1"></div>
      <div class="burger-menu-line__2"></div>
      <div class="burger-menu-line__3"></div>
    </div>

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
        <a href="pages/sub-threads-list.html"
          ><li class="sub-fav-01">s/WebDevelopment</li></a
        >
        <li class="sub-fav-02">s/SpaceX</li>
        <li class="sub-fav-03">s/ProgrammerHumor</li>
        <li class="sub-fav-04">s/Openclassrooms</li>
        <li class="sub-fav-05">s/Github</li>
      </ul>
    </div>

    <main id="home">
      <p id="home-message">
        Rien à voir ici ...<br />Cliquez quelque-part pour naviguer :)
      </p>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss">
/* Variables */
$transparent-light-blue: #84828f80;
$light-blue: #84828f;
$dark-blue: #3e4c5e;
$darker-blue: #2c3d55;

$screen-height-size: calc(100vh - 75px);

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

    a {
      text-decoration: none;
      color: #fff;
    }
  }
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

#threads {
  @media screen and(min-width: 992px) {
    //margin-left: 350px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .thread-in-sub {
    width: 90%;
    margin: 10px auto;
    border-radius: 3px;
    height: 75px;
    background: $transparent-light-blue;
    color: #fff;

    &:hover {
      background: $light-blue;
    }

    p {
      margin: auto 5px;
      padding-top: 10px;
    }
  }
}

.separation-line {
  display: block;
  margin: 0 auto;
  width: 330px;
  height: 1px;
  background-color: $light-blue;
}

/* Post Line */
#post-line {
  @media screen and(min-width: 992px) {
    //margin-left: 5%;
  }

  #user-text-post {
    width: 90%;
    margin: 10px 0;
    margin-left: 100px;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 80%;
    }

    p {
      margin: 10px;
      text-align: justify;
    }

    .separation-line {
      width: 300px;
    }

    #buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 15px 0;

      @media screen and(min-width: 992px) {
        justify-content: left;
        margin-left: 15px;
      }

      .button {
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px 10px;
        text-align: center;

        @media screen and(min-width: 992px) {
          margin: 0 5px;
        }
      }
    }
  }
}

/* Comments */
#comments {
  @media screen and(min-width: 992px) {
    padding-left: 10%;
  }

  .post-comment {
    width: 90%;
    margin: 15px auto;
    margin-right: 10px;
    border-radius: 5px;
    background: #fff;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 70%;
      margin-right: auto;
    }

    .comment-infos {
      display: flex;
      margin: 15px auto;
      justify-content: space-around;
      align-items: center;

      @media screen and(min-width: 992px) {
        justify-content: left;
      }

      .profile-picture {
        width: 50px;
        height: 50px;
        background: gray;

        @media screen and(min-width: 992px) {
          margin: 0 15px;
        }
      }
    }

    .comment-text {
      margin: 10px;
      text-align: justify;
    }
  }
}

/* Burger Menu */
.burger-menu {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  left: 20px;
  top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;

  @media screen and (min-width: 992px) {
    display: none;
  }

  &-line__1,
  &-line__2,
  &-line__3 {
    width: 40px;
    height: 3px;
    background: #fff;
    border-radius: 5px;
    transition: all 0.5s ease;
  }
}

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

input {
  display: block;
  width: 50px;
  height: 50px;
  position: fixed;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  left: 20px;
  top: 12px;

  @media screen and (min-width: 992px) {
    display: none;
  }

  &:checked {
    + .burger-menu {
      .burger-menu-line {
        &__1 {
          transform: rotate(-45deg) translate(-10px, 10px);
        }
        &__2 {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
        &__3 {
          transform: rotate(45deg) translate(-8px, -9px);
        }
      }
    }

    ~ #navigation-bar {
      transform: translate(0, 0);
    }
  }
}

/* Home */
#home {
  display: flex;
  align-items: center;
  justify-content: center;

  &-message {
    @media screen and(min-width: 992px) {
      //margin-left: 350px;
    }

    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: $darker-blue;
  }
}

main {
  @media screen and (min-width: 992px) {
    grid-area: main;
    overflow-y: scroll;
  }
}
</style>

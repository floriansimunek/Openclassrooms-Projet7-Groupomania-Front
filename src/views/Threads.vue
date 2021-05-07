<template>
  <div class="thread">
    <header>
      <h1><a href="../index.html">Groupomania</a></h1>
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
          Florian<br />u/Flo_SMNK • Connecté <span id="connection-state"></span>
        </p>
      </div>
      <span class="separation-line"></span>
      <ul id="favs">
        <p>Favoris</p>
        <a href="sub-threads-list.html"
          ><li class="sub-fav-01">s/WebDevelopment</li></a
        >
        <li class="sub-fav-02">s/SpaceX</li>
        <li class="sub-fav-03">s/ProgrammerHumor</li>
        <li class="sub-fav-04">s/Openclassrooms</li>
        <li class="sub-fav-05">s/Github</li>
      </ul>
    </div>

    <main>
      <div id="informations-bar">
        <p>s/WebDevelopement<br />165.8K</p>
        <p>Créé le 03/04/2014<br />15.2 threads</p>
      </div>

      <div id="threads">
        <a href="thread-in-sub.html">
          <div class="thread-in-sub">
            <p>
              Sujet : Comment faire une maquette Figma ?<br />Écrit par :
              Max_SMNK • 03/11/2021<br />56 commentaires
            </p>
          </div>
        </a>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
        <div class="thread-in-sub">
          <p>
            Sujet : Comment faire une maquette Figma ?<br />Écrit par : Max_SMNK
            • 03/11/2021<br />56 commentaires
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
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
</style>

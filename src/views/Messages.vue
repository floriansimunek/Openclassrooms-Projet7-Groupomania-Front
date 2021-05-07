<template>
  <div class="messages">
    <header>
      <h1><a href="/">Groupomania</a></h1>
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
        <a href="/threads"><li class="sub-fav-01">s/WebDevelopment</li></a>
        <li class="sub-fav-02">s/SpaceX</li>
        <li class="sub-fav-03">s/ProgrammerHumor</li>
        <li class="sub-fav-04">s/Openclassrooms</li>
        <li class="sub-fav-05">s/Github</li>
      </ul>
    </div>

    <main>
      <div id="informations-bar">
        <p>
          Écrit par u/Max_SMNK • 01/09/2021<br />Sujet : Comment faire une
          maquette Figma ?
        </p>
      </div>

      <div id="post-line">
        <div id="user-text-post">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit aliquam
            pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis euismod
            urna. Montes, molestie non fusce libero tincidunt laoreet. Gravida
            interdum ullamcorper nisi quam sapien. Mi lorem morbi consectetur
            dictum sollicitudin egestas nec enim. Enim ultricies enim, eu justo
            mauris, amet. Urna tellus hac diam facilisi a. Augue varius
            phasellus risus enim. Proin dolor eu volutpat praesent et malesuada.
            Sollicitudin nulla vestibulum proin diam tortor volutpat. Risus,
            vestibulum, diam hendrerit cursus pellentesque sollicitudin. Amet,
            parturient volutpat mauris felis egestas eget sollicitudin urna.
            Ornare imperdiet fringilla feugiat nullam vel sem. Ac ante malesuada
            magna nisi velit porttitor. Elit amet faucibus faucibus est nec, id
            pellentesque elementum. Eget cras amet, purus, sed. Quis risus
            volutpat cras hac volutpat id et, in tincidunt. Nibh dolor et
            praesent ut eget nunc habitasse ac. Varius tellus ut massa etiam
            porttitor sit tellus massa in.
          </p>
          <span class="separation-line"></span>
          <div id="buttons">
            <div class="reply-btn button">Répondre</div>
            <div class="like-btn button">Like</div>
            <div class="dislike-btn button">Dislike</div>
          </div>
        </div>
        <div id="comments">
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
          <div class="post-comment">
            <div class="comment-infos">
              <div class="profile-picture"></div>
              <p>Écrit par u/Jo_SMNK • 03/11/2021</p>
            </div>
            <p class="comment-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              aliquam pharetra, mi scelerisque. Sed mattis arcu aliquam, turpis
              euismod urna. Montes, molestie non fusce libero tincidunt laoreet.
              Gravida interdum ullamcorper nisi quam sapien. Mi lorem morbi
              consectetur dictum sollicitudin egestas nec enim. Enim ultricies
              enim, eu justo mauris, amet. Urna tellus hac diam facilisi a.
              Augue varius phasellus risus enim.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  components: {},
};
</script>

<style lang="scss">
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
</style>

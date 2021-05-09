<template>
  <div class="messages">
    <Layout />

    <main>
      <!-- TODO: delete v-if + v-for -->
      <div id="informations-bar">
        <MessageInformations
          v-for="message in messages"
          v-if="message._id === $route.params.messageId"
          :key="message._id"
          :userId="message.userId"
          :subject="message.subject"
          :createdAt="message.createdAt"
        />
      </div>

      <!-- TODO: delete v-if + v-for -->
      <div id="post-line">
        <div id="user-text-post">
          <Message
            v-for="message in messages"
            v-if="message._id === $route.params.messageId"
            :key="message._id"
            :message="message.message"
          />
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
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Layout from '@/components/layout';
import Message from '@/components/inMessage';
import MessageInformations from '@/components/messageInformations';

export default {
  name: 'Messages',
  components: { Layout, Message, MessageInformations },
  data() {
    return {
      messages: [
        {
          _id: '608d509e2a55962e64786b52',
          threadId: '608874dd6ab64712ecbfb83e',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 2',
          message: 'My message is so looooooooooooooooong 2',
          createdAt: '2021-05-01T12:59:10.225Z',
          __v: 0,
        },
        {
          _id: '6095696cf819493534f5585f',
          threadId: '608d50c72a55962e64786b53',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 1',
          message: 'Message subject 1 blablablabla',
          createdAt: '2021-05-07T16:23:08.426Z',
          __v: 0,
        },
        {
          _id: '6095698bf819493534f55861',
          threadId: '608d50c72a55962e64786b53',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 3',
          message: 'Message subject 3 blablablabla',
          createdAt: '2021-05-07T16:23:39.976Z',
          __v: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.messages {
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

/* Post Line */
#post-line {
  #user-text-post {
    width: 90%;
    margin: 10px 0;
    margin-left: 5%;
    background: #fff;
    border-radius: 5px;
    padding: 5px 0;

    @media screen and(min-width: 992px) {
      width: 80%;
      margin-left: 10%;
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

main {
  @media screen and (min-width: 992px) {
    grid-area: main;
    overflow-y: scroll;
  }
}
</style>

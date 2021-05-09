<template>
  <div class="threads">
    <Layout />

    <main>
      <!-- TODO: Informations from props -->
      <div id="informations-bar">
        <p>s/WebDevelopement<br />165.8K</p>
        <p>Créé le 03/04/2014<br />15.2K threads</p>
      </div>

      <div id="threads">
        <Message
          v-for="message in messages"
          :key="message._id"
          :subject="message.subject"
          :createdAt="message.createdAt"
          :userId="message.userId"
          :messageId="message._id"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Layout from '@/components/layout';
import Message from '@/components/message';

export default {
  name: 'Thread',
  components: { Layout, Message },
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
.threads {
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

#threads {
  @media screen and(min-width: 992px) {
    //margin-left: 350px;
  }
}

main {
  @media screen and (min-width: 992px) {
    grid-area: main;
    overflow-y: scroll;
  }
}
</style>

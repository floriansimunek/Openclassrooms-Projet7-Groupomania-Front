<template>
  <div class="threads">
    <Layout />

    <main>
      <!-- TODO: delete v-if + v-for // userId into username -->
      <ThreadInformations
        v-for="thread in threads"
        v-if="thread._id === $route.params.threadId"
        :key="thread._id"
        :name="thread.name"
        :createdAt="thread.createdAt"
        :user="thread.userId"
      />

      <!-- TODO: delete v-if + v-for -->
      <div id="threads">
        <Message
          v-for="message in messages"
          v-if="message.threadId === $route.params.threadId"
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
import ThreadInformations from '@/components/threadInformations';

export default {
  name: 'Thread',
  components: { Layout, Message, ThreadInformations },
  data() {
    return {
      messages: [
        {
          _id: '608d509e2a55962e64786b52',
          threadId: '6097d2472d6ac23b78fb91c5',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 2',
          message: 'My message is so looooooooooooooooong 2',
          createdAt: '2021-05-01T12:59:10.225Z',
          __v: 0,
        },
        {
          _id: '6095696cf819493534f5585f',
          threadId: '6097af4e361f6831c48d7a83',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 1',
          message: 'Message subject 1 blablablabla',
          createdAt: '2021-05-07T16:23:08.426Z',
          __v: 0,
        },
        {
          _id: '6095698bf819493534f55861',
          threadId: '6097af4e361f6831c48d7a83',
          userId: '654654564564156151b115b65',
          subject: 'Message subject 3',
          message: 'Message subject 3 blablablabla',
          createdAt: '2021-05-07T16:23:39.976Z',
          __v: 0,
        },
      ],
      threads: [
        {
          _id: '6097af4e361f6831c48d7a83',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread name',
          description: 'Thread description blablablablablablabla',
          createdAt: '2021-05-01T12:59:51.606Z',
          __v: 0,
        },
        {
          _id: '6097d2472d6ac23b78fb91c5',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread test 1',
          description:
            'Thread test 1 blablablablablablablablablablablablablablablablablablablabla',
          createdAt: '2021-05-07T16:09:03.769Z',
          __v: 0,
        },
        {
          _id: '6097d24a2d6ac23b78fb91c6',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread test 2',
          description:
            'Thread test 2 blablablablablablablablablablablablablablablablablablablabla',
          createdAt: '2021-05-07T16:09:16.312Z',
          __v: 0,
        },
        {
          _id: '6097d24d2d6ac23b78fb91c7',
          userId: '6097af4a361f6831c48d7a82',
          name: 'Thread test 3',
          description:
            'Thread test 3 blablablablablablablablablablablablablablablablablablablabla',
          createdAt: '2021-05-07T16:09:21.679Z',
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

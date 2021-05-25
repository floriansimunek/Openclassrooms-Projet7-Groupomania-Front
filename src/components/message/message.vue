<template>
  <div class="messageInThread" v-if="!answerMessageId">
    <router-link
      :to="{
        name: 'MessagesList',
        params: {
          threadId: $route.params.threadId,
          messageId,
        },
      }"
    >
      <p>
        Sujet : {{ subject }}<br />
        Écrit par : {{ username }} •
        {{
          new Date(Date.parse(createdAt))
            .toLocaleDateString('fr', {
              hour: 'numeric',
              minute: 'numeric',
            })
            .replace(':', 'h')
        }}
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    subject: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    messageId: {
      type: Number,
      required: true,
    },
    answerMessageId: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;
}

.messageInThread {
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
</style>

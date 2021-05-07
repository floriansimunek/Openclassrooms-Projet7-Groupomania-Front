<template>
  <a :href="`/message/${_id}`">
    <div class="thread-in-sub">
      <p>
        Sujet : {{ subject }}<br />
        Écrit par : {{ userId }} • {{ createdAt }}<br />
        {{ commentCount }} commentaires
      </p>
    </div>
  </a>
</template>

<script>
export default {
  name: 'thread',
  props: {
    subject: {
      type: String,
      required: true,
    },
    // TODO: Print user.name à la place de userId
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    commentCount: {
      type: Number,
      // TODO: Set required true
      required: false,
    },
    _id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>

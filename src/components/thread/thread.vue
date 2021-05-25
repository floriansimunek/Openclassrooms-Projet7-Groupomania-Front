<template>
  <router-link :to="{ name: 'ThreadsList', params: { threadId } }">
    <li class="">{{ name }}</li>
  </router-link>
</template>

<script>
export default {
  name: 'threadList',
  props: {
    name: {
      type: String,
      required: true,
    },
    threadId: {
      type: Number,
      required: true,
    },
  },
};
</script>

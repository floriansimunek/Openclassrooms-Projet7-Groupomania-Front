<template>
  <router-link :to="{ name: 'ThreadsList', params: { threadId } }">
    <li class="">{{ name }}</li>
  </router-link>
</template>

<script>
export default {
  name: 'navigationBar',
  props: {
    name: {
      type: String,
      required: true,
    },
    threadId: {
      type: String,
      required: true,
    },
  },
};
</script>

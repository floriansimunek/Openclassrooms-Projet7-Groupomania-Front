<template>
  <a :href="`/thread/${threadId}`">
    <li class="">{{ name }}</li>
  </a>
</template>

<script>
export default {
  name: 'thread',
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

<template>
  <div id="message">
    <p>{{ message }}</p>
    <img id="messageImage" v-if="imageUrl" :src="imageUrl" />
  </div>
</template>

<script>
export default {
  name: 'inMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
};
</script>

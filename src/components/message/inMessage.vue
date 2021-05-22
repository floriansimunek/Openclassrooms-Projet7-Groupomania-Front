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

<style lang="scss" scoped>
#message {
  margin: 10px;

  p {
    overflow-wrap: break-word;
  }

  &Image {
    height: 30%;
    width: 30%;
    margin: 20px auto;
    display: block;
  }
}
</style>

<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  name: 'inMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

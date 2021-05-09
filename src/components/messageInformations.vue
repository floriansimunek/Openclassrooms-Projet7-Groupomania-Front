<template>
  <p>
    Écrit par {{ userId }} •
    {{
      new Date(Date.parse(createdAt))
        .toLocaleDateString('fr', {
          hour: 'numeric',
          minute: 'numeric',
        })
        .replace(':', 'h')
    }}<br />Sujet : {{ subject }}
  </p>
</template>

<script>
export default {
  name: 'messageInformations',
  props: {
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
};
</script>

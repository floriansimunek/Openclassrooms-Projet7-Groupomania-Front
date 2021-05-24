<template>
  <div id="informations-bar">
    <p>{{ name }}<br />{{ description }}</p>

    <p>
      Créé par : {{ username }}<br />
      {{
        new Date(Date.parse(createdAt))
          .toLocaleDateString('fr', {
            hour: 'numeric',
            minute: 'numeric',
          })
          .replace(':', 'h')
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'threadInformations',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
/* Informations Bar */
#informations-bar {
  background: $light-blue;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: #fff;
    line-height: 1.3em;
    margin: 0 10px;
    word-break: break-all;

    @media screen and (max-width: 992px) {
      width: 100%;
    }

    &:nth-child(2) {
      text-align: right;
    }
  }
}
</style>

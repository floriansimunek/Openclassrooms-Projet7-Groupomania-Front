<template>
  <div id="informations-bar">
    <p>{{ name }}<br />{{ description }}</p>
    <p>
      {{
        new Date(Date.parse(createdAt))
          .toLocaleDateString('fr', {
            hour: 'numeric',
            minute: 'numeric',
          })
          .replace(':', 'h')
      }}
      <br />Créé par : {{ username }}
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

  @media screen and(min-width: 992px) {
    //margin-left: 350px;
  }

  p {
    color: #fff;
    line-height: 1.3em;
    margin: 0 10px;

    &:nth-child(2) {
      text-align: right;
    }
  }
}
</style>

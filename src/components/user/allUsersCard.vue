<template>
  <div class="user-card">
    <strong>Nom d'utilisateur:<br /></strong> {{ username }} <br /><br />
    <strong>Adresse email:<br /></strong> {{ email }} <br /><br />
    <strong>Création du compte:<br /></strong>
    {{
      new Date(Date.parse(createdAt))
        .toLocaleDateString('fr', {
          hour: 'numeric',
          minute: 'numeric',
        })
        .replace(':', 'h')
    }}
  </div>
</template>

<script>
export default {
  name: 'allUsersCard',
  props: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  background: $darker-blue;
  color: white;
  margin: 10px;
  width: 18%;
  height: 200px;
  text-align: center;
  padding-top: 20px;
}
</style>

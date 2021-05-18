<template>
  <div class="user-card">
    <strong>Nom d'utilisateur:</strong> {{ username }} <br />
    <strong>Adresse email:</strong> {{ email }} <br />
    <strong>Création du compte:</strong>
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

<style>
.card-user {
  color: white;
}
</style>

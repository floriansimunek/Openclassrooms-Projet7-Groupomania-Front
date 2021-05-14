<template>
  <div class="register-form">
    <header>
      <h1>Groupomania</h1>
    </header>

    <div class="user-system">
      <div class="user-system-form">
        <h2>S'inscrire</h2>
        <form action="" method="post">
          <div class="user-system-inputs">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
            />
            <input type="text" name="mail" placeholder="Email" />
            <input type="text" name="password" placeholder="Mot de passe" />
            <input
              type="text"
              name="confirm-password"
              placeholder="Confirmation mot de passe"
            />
          </div>
          <div class="user-system-buttons">
            <router-link :to="{ name: 'Login' }">
              <input
                class="user-system-buttons-user-system"
                type="submit"
                value="Se connecter"
              />
            </router-link>
            <input
              class="user-system-buttons-register"
              type="submit"
              value="S'inscrire"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
};
</script>

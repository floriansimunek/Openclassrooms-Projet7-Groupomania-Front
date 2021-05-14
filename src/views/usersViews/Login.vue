<template>
  <div class="login-form">
    <header>
      <h1>Groupomania</h1>
    </header>
    <div class="user-system">
      <div class="user-system-form">
        <h2>Connexion</h2>
        <form action="" method="post">
          <div class="user-system-inputs">
            <input type="text" name="mail" placeholder="Email" />
            <input type="text" name="password" placeholder="Mot de passe" />
          </div>
          <div class="user-system-buttons">
            <router-link
              :to="{
                name: 'Register',
              }"
            >
              <input
                class="user-system-buttons-register"
                type="submit"
                value="S'inscrire"
              />
            </router-link>
            <input
              class="user-system-buttons-user-system"
              type="submit"
              value="Se connecter"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

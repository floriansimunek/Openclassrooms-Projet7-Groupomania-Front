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
            <input
              class="user-system-buttons-user-system"
              type="submit"
              value="Se connecter"
            />
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

<style lang="scss" scoped>
/* Header */
header {
  background-color: $darker-blue;
  color: #fff;
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 100px;

  @media screen and (min-width: 992px) {
    grid-area: header;
    padding-left: 0;
  }

  h1 {
    margin-right: 60px;

    @media screen and (min-width: 992px) {
      margin-left: 20px;
    }
  }
}

/* User System Form */
.user-system {
  position: fixed;
  width: 100%;
  height: $screen-height-size;
  left: 0;
  top: 75px;
  background: $dark-blue;
  transition: all 0.5s ease-in-out;
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;

  &-form {
    margin: 0 auto;
    text-align: center;
    width: 40%;
  }

  &-inputs {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    input {
      height: 30px;
      text-align: center;
      margin: 5px auto;
      width: 50%;
      background: $light-blue;
      border: none;
      border-radius: 2px;
      color: white;
      font-size: 18px;
    }
  }

  &-buttons {
    input {
      width: 20%;
      height: 30px;
      color: white;
      border: none;
      border-radius: 2px;
      margin: 0 5px;
      font-size: 18px;
    }

    &-user-system {
      background: #03c946;
    }

    &-register {
      background: $darker-blue;
    }
  }
}
</style>

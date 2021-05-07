<template>
  <div class="home">
    <Layout />

    <main>
      <p id="home-message">
        Rien à voir ici ...<br />Cliquez quelque-part pour naviguer :)
      </p>
    </main>
  </div>
</template>

<script>
import Layout from '@/components/layout';

export default {
  name: 'Home',
  components: { Layout },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: rgba(44, 61, 85, 0.05);
  padding-top: 75px;
  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-template-rows: 75px 1fr;
    grid-template-areas:
      'header header'
      'sidebar main';
    max-height: 100vh;
    padding-top: 0;
  }
}

.separation-line {
  display: block;
  margin: 0 auto;
  width: 330px;
  height: 1px;
  background-color: $light-blue;
}

/* Home */
main {
  @media screen and (min-width: 992px) {
    grid-area: main;
    overflow-y: scroll;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  #home-message {
    @media screen and(min-width: 992px) {
      //margin-left: 350px;
    }

    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: $darker-blue;
  }
}
</style>

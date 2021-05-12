<template>
  <div class="threads">
    <Layout />
    <router-view />
  </div>
</template>

<script>
import Layout from '@/components/layout';

export default {
  name: 'Thread',
  components: { Layout },
};
</script>

<style lang="scss" scoped>
.threads {
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

#threads {
  @media screen and(min-width: 992px) {
    //margin-left: 350px;
  }
}
</style>

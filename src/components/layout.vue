<template>
  <fragment>
    <Custom-Header />
    <Burger-Menu />
    <Navigation-Bar />
  </fragment>
</template>

<script>
import CustomHeader from '@/components/header.vue';
import BurgerMenu from '@/components/burgerMenu.vue';
import NavigationBar from '@/components/navigationBar.vue';

export default {
  name: 'layout',
  components: { CustomHeader, BurgerMenu, NavigationBar },
};
</script>

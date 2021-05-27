<template>
  <header>
    <router-link :to="{ name: 'Home' }"
      ><img src="@/images/icon-left-font-monochrome-white.png"
    /></router-link>
  </header>
</template>

<script>
export default {
  name: 'custom-header',
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
}

img {
  transform: scale(0.3);
}
</style>

<template>
  <header>
    <h1><a href="/">Groupomania</a></h1>
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

  h1 {
    margin-right: 60px;

    @media screen and (min-width: 992px) {
      margin-left: 20px;
    }

    a {
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>

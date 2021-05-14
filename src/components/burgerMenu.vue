<template>
  <fragment>
    <input type="checkbox" />
    <div class="burger-menu">
      <div class="burger-menu-line__1"></div>
      <div class="burger-menu-line__2"></div>
      <div class="burger-menu-line__3"></div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: 'burger-menu',
};
</script>

<style lang="scss">
/* Burger Menu */
.burger-menu {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  left: 20px;
  top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;

  @media screen and (min-width: 992px) {
    display: none;
  }

  &-line__1,
  &-line__2,
  &-line__3 {
    width: 40px;
    height: 3px;
    background: #fff;
    border-radius: 5px;
    transition: all 0.5s ease;
  }
}

input[type='checkbox'] {
  display: block;
  width: 50px;
  height: 50px;
  position: fixed;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  left: 20px;
  top: 12px;

  @media screen and (min-width: 992px) {
    display: none;
  }

  &:checked {
    + .burger-menu {
      .burger-menu-line {
        &__1 {
          transform: rotate(-45deg) translate(-10px, 10px);
        }
        &__2 {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }
        &__3 {
          transform: rotate(45deg) translate(-8px, -9px);
        }
      }
    }

    ~ #navigation-bar {
      transform: translate(0, 0);
    }
  }
}
</style>

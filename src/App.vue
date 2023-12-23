<template>
  <div id="app" class="app container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.app {
  min-height: 100lvh;
  padding-block-start: 8vmin;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

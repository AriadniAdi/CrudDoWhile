<template>
  <div id="app">
    <header>
      <nav width="200px" heigth="100px"></nav>
  </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

header {
  width: 200px;
}

nav {
  text-align: left;
}

container {
      align: center;
}
</style>

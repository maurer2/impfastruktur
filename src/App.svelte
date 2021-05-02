<script lang="ts">
  import "sanitize.css/sanitize.css";
  import Row from "./components/Row.svelte";

  let title: string = 'Original'
</script>

<template>
  <div id="app">
    <Row title={title} />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

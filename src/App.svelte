<script lang="ts">
  import "sanitize.css/evergreen.css";
  import "sanitize.css/typography.css";

  import Row from "./components/Row.svelte";
  import RowCopy from "./components/RowCopy.svelte";
  import RowClamp from "./components/RowClamp.svelte";

</script>

<template>
  <div id="app">
    <Row title="Original" />
    <hr />
    <RowCopy title="Copy" />
    <hr />
    <RowClamp title="Clamp" />
  </div>
</template>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
  }
</style>

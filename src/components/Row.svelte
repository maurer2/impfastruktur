<script lang="ts">
  export let title: string;
</script>

<template>
  <div class="row">
    <div class="column">
      <h1>{title}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
  :global(.row) {
    --padding-left: -1;
    --padding-right: -1;
  }

  .row {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    width: 100%;

    // debug
    background-color: red;
    background-clip: content-box;

    // paddings
    padding-left: calc(1 * 27.04px);
    padding-right: calc(1 * 27.04px);

    @media (min-width: 480px) {
      padding-left: calc( 1 * ( 27.04px + 13.46 * (100vw - 480px) / 800 ) );
      padding-right: calc( 1 * ( 27.04px + 13.46 * (100vw - 480px) / 800 ) );
    }

    @media (min-width: 1280px) {
      padding-left: calc(1 * 40.5px);
      padding-right: calc(1 * 40.5px);
    }
  }
</style>

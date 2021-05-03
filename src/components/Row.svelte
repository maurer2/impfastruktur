<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let title: string;

  let rowElement: HTMLElement | undefined;
  let resizeObserver = new ResizeObserver((entries) => {
    const {contentRect} = entries[0]

    const paddingLeft = contentRect.left
    const paddingRight = contentRect.right - contentRect.width

    rowElement?.style.setProperty('--padding-left', `"${paddingLeft}"`)
    rowElement?.style.setProperty('--padding-right', `"${paddingRight}"`)
  })

  onMount(() => {
    if (rowElement === undefined) {
      return
    }

    resizeObserver.observe(rowElement);
  })

  onDestroy(() => {
    !!rowElement && resizeObserver.unobserve(rowElement);
  })
</script>

<template>
  <div class="row" bind:this={rowElement}
  >
    <div class="column">
      <h1>{title}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
  :global(.row) {
    --padding-left: "-1";
    --padding-right: "-1";
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

    &::before,
    &::after {
      position: absolute;
      margin: auto;
      padding: 0.5rem;
      top: 0;
      bottom: 0;
      background: blue;
      color: white;

      @supports not (height: fit-content) {
        display: flex;
        align-items: center;
      }

      @supports (height: fit-content) {
        height: fit-content;
      }
    }

    &::before {
      content: var(--padding-left);
      left: 0;
    }

    &::after {
      content: var(--padding-right);
      right: 0;
    }

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

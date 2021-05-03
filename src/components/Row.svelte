<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let title: string;

  let paddingLeft: number = 0;
  let paddingRight: number = 0;
  let cssVars: Record<string, string>;
  let cssVarsStringified: string;
  let rowElement: HTMLElement | undefined;
  let resizeObserver: ResizeObserver

  $: cssVars = {
    '--padding-left': `${paddingLeft}`,
    '--padding-right': `${paddingRight}`,
  };
  $: cssVarsStringified = Object.entries(cssVars)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(';');

  resizeObserver = new ResizeObserver((entries) => {
    const { contentRect } = entries[0];

    paddingLeft = contentRect.left;
    paddingRight = contentRect.right - contentRect.width;
  });

  onMount(() => {
    if (rowElement === undefined) {
      return;
    }

    resizeObserver.observe(rowElement);
  });

  onDestroy(() => {
    if (rowElement === undefined) {
      return;
    }

    resizeObserver.unobserve(rowElement);
  });
</script>

<template>
  <div class="row" bind:this={rowElement} style={cssVarsStringified}>
    <div class="column">
      <h1>{title}</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
  /*
  :global(.row) {
    --padding-left: "-1";
    --padding-right: "-1";
  }
  */

  .row {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    width: 100%;

    /* debug */
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

    /* paddings */
    padding-left: calc(1 * 27.04px);
    padding-right: calc(1 * 27.04px);

    @media (min-width: 480px) {
      padding-left: calc(1 * (27.04px + 13.46 * (100vw - 480px) / 800));
      padding-right: calc(1 * (27.04px + 13.46 * (100vw - 480px) / 800));
    }

    @media (min-width: 1280px) {
      padding-left: calc(1 * 40.5px);
      padding-right: calc(1 * 40.5px);
    }
  }
</style>

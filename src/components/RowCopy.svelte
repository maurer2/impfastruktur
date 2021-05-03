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

    // https://wpmelb.org/wp-content/uploads/2017/12/UXDesign-typography.pdf#page=19
    // modular scale
    $lower-bound: 27.04px; // 18px * 1.5
    $upper-bound: 40.50px; // 18px * 1.5 * 1.5

    padding-left: calc(1 * #{$lower-bound});
    padding-right: calc(1 * #{$lower-bound});

    @media (min-width: 480px) {
      // https://css-tricks.com/snippets/css/fluid-typography/
      // calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
      padding-left: calc(#{$lower-bound} + (#{$upper-bound} - (calc(100vw - 480px) / (1280 - 480))));
      // padding-left: calc(1 * (27.04px + 13.46 * (100vw - 480px) / 800));
      padding-right: calc(1 * (27.04px + 13.46 * (100vw - 480px) / 800));
    }

    @media (min-width: 1280px) {
      padding-left: calc(1 * #{$upper-bound});
      padding-right: calc(1 * #{$upper-bound});
    }
  }
</style>

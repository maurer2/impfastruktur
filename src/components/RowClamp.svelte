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
    $lower-bound: 27.04; // 18px * 1.5
    $upper-bound: 40.50; // 18px * 1.5 * 1.5
    $viewport-min: 480;
    $viewport-max: 1280;
    $change-delta: $upper-bound - $lower-bound;

    --percentage-between-viewport-min-max: calc(100 * calc(calc(100vw - #{$viewport-min}px) / (#{$viewport-max} - #{$viewport-min})));

    @supports (padding: clamp(1px, 2px, 3px)) {
      padding-left: clamp(#{$lower-bound}px, calc(#{$lower-bound}px + (var(--percentage-between-viewport-min-max) * #{$change-delta} / 100)), #{$upper-bound}px);
      padding-right: clamp(#{$lower-bound}px, calc(#{$lower-bound}px + (var(--percentage-between-viewport-min-max) * #{$change-delta} / 100)), #{$upper-bound}px);
    }

    @supports not (padding: clamp(1px, 2px, 3px)) {
      @supports (padding: Max(3px)) and (padding: Min(1px)) {
        padding-left: Max(#{$lower-bound}px, Min(calc(#{$lower-bound}px + (var(--percentage-between-viewport-min-max) * #{$change-delta} / 100)), Max(#{$upper-bound}px)));
        padding-right: Max(#{$lower-bound}px, Min(calc(#{$lower-bound}px + (var(--percentage-between-viewport-min-max) * #{$change-delta} / 100)), Max(#{$upper-bound}px)));
      }

      @supports not ((padding: Max(3px)) and (padding: Min(1px))) {
        padding-left: calc(1px * #{$lower-bound});
        padding-right: calc(1px * #{$lower-bound});
      }
    }
}

</style>

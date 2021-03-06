import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
// import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript';

export default {
  plugins: [
    // css({ output: 'public/sanitize.css' }),
    svelte({
      preprocess: autoPreprocess({
        postcss: true,
        scss: { includePaths: ['src', 'node_modules'] },
        markupTagName: 'template',
      }),
    }),
    typescript(),
  ],
};

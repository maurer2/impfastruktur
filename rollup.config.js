import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
// import css from 'rollup-plugin-css-only';

export default {
  plugins: [
    // css({ output: 'public/sanitize.css' }),
    svelte({
      preprocess: autoPreprocess({
        postcss: true,
        scss: { includePaths: ['src', 'node_modules'] },
      }),
    }),
  ],
};

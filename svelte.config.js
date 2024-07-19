import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), sveltePreprocess()],
  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),
  },
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return
    if (warning.code === 'missing-exports-condition') return
    if (warning.code === 'a11y-no-static-element-interactions') return
    if (warning.code === 'svelte-ignore a11y-autofocus') return
    if (warning.code.startsWith('css-unused-selector')) return
    handler(warning)
  },
  compilerOptions: {
    runes: true,
  },
}

export default config

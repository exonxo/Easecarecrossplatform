import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * Vite plugin to resolve `figma:asset/...` virtual imports for production builds.
 * In Figma Make's dev server these are handled internally, but standard Vite/Rollup
 * doesn't know about them, so we resolve them to a tiny transparent 1×1 PNG data-URI.
 */
function figmaAssetPlugin(): Plugin {
  return {
    name: 'figma-asset-resolver',
    resolveId(source) {
      if (source.startsWith('figma:asset/')) {
        return `\0figma-asset:${source}`;
      }
      return null;
    },
    load(id) {
      if (id.startsWith('\0figma-asset:')) {
        // Export a 1×1 transparent PNG data URI as the default
        return `export default "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg=="`;
      }
      return null;
    },
  };
}

export default defineConfig({
  // Use VITE_BASE_PATH env var for flexibility across hosts (e.g. '/Easecareweb/' for GitHub Pages, '/' for Netlify)
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Resolve figma:asset/* virtual imports for production builds
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
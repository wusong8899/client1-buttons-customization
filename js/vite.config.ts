import { defineConfig } from 'vite';
import path from 'node:path';

// Vite config for a Flarum extension with separate admin and forum bundles.
// Single config with two inputs; format iife forbids code-splitting, so each
// entry builds as its own single file (admin.js, forum.js) in js/dist.

export default defineConfig({
  root: path.resolve(__dirname),
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, 'admin.js'),
        forum: path.resolve(__dirname, 'forum.js'),
      },
      external: (id: string) => {
        if (id === '@flarum/core/admin' || id === '@flarum/core/forum') return true;
        if (id === 'jquery') return true;
        if (id.startsWith('flarum/')) return true; // legacy compat modules
        return false;
      },
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        globals: (id: string) => {
          if (id === '@flarum/core/admin' || id === '@flarum/core/forum') return 'flarum.core';
          if (id === 'jquery') return 'jQuery';
          const compat = id.match(/^flarum\/(.+)$/);
          if (compat) return `flarum.core.compat['${compat[1]}']`;
          return id;
        },
      },
    },
  },
  esbuild: {
    // Match Babel JSX settings used by flarum-webpack-config for Mithril
    jsxFactory: 'm',
    jsxFragment: "'['",
    // Provide a minimal tsconfig inline so esbuild doesn't try to read the root tsconfig
    tsconfigRaw: {
      compilerOptions: {
        isolatedModules: true,
      },
    },
  },
});


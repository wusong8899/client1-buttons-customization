import { defineConfig } from 'vite';
import path from 'node:path';

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
      },
      external: (id: string) => {
        if (id === '@flarum/core/admin' || id === '@flarum/core/forum') return true;
        if (id === 'jquery') return true;
        if (id.startsWith('flarum/')) return true; // legacy compat modules
        return false;
      },
      output: {
        format: 'iife',
        inlineDynamicImports: true,
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
    jsxFactory: 'm',
    jsxFragment: "'['",
    tsconfigRaw: {
      compilerOptions: {
        isolatedModules: true,
      },
    },
  },
});


import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/app.ts'],
    format: ['esm'],
    dts: true,
    minify: true,
    sourcemap: true,
    clean: true,
});

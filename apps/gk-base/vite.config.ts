import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    base: '',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        minify: 'terser', // esbuild has bug in keep_fnames
        terserOptions: {
            keep_fnames: true,
        },
    },
});

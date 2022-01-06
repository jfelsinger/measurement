import { terser } from 'rollup-plugin-terser';

export default {
    input: 'dist/esm/browser.js',
    output: [
        { file: 'dist/measurement.js', format: 'iife' },
        { file: 'dist/measurement.js', format: 'iife', plugins:[terser()] },
    ],
}

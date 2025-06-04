// build-lambda.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/lambda.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/lambda.js',
  external: ['pg'], // deja fuera dependencias nativas
}).catch(() => process.exit(1));

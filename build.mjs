import * as esbuild from 'esbuild'
import yaml from 'esbuild-plugin-yaml'
const { yamlPlugin } = yaml
import html from 'esbuild-plugin-html-modules'
import style from 'esbuild-style-plugin'
import colorFunction from 'postcss-color-function'

await esbuild.build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  outdir: 'build/',
  loader: { '.css': 'local-css' },
  plugins: [ yamlPlugin(), html(), style({
    cssModulesMatch: /.*\.css/,
    postcss: {
      plugins: [ colorFunction ]
    }
  }) ]
})

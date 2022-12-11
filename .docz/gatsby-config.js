const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Weitus Front',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        port: 3001,
        p: 3001,
        root: '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Weitus Front',
        description: 'My awesome app using docz',
        host: 'localhost',
        separator: '-',
        paths: {
          root: '/home/radkoski/Coding/Studia/PZSP2/weitus-front',
          templates:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/node_modules/.pnpm/docz-core@2.4.0_7uljwnkihcijt3uhorq6ifkcge/node_modules/docz-core/dist/templates',
          docz: '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz',
          cache: '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/.cache',
          app: '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app',
          appPackageJson:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/package.json',
          appTsConfig:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/tsconfig.json',
          gatsbyConfig:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/gatsby-config.js',
          gatsbyBrowser:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/gatsby-browser.js',
          gatsbyNode:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/gatsby-node.js',
          gatsbySSR:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/gatsby-ssr.js',
          importsJs:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app/imports.js',
          rootJs:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app/root.jsx',
          indexJs:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app/index.jsx',
          indexHtml:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app/index.html',
          db:
            '/home/radkoski/Coding/Studia/PZSP2/weitus-front/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)

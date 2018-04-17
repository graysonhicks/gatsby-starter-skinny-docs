const config = {
  pathPrefix: '/gatsby-starter-skinny-docs',
  siteUrl: 'https://github.com/graysonhicks', // w/o pathPrefix
  siteFullUrl: this.pathPrefix + this.siteUrl,
  siteLogo: '/logos/logo.png', // Logo used for SEO and manifest.
  siteTitle: 'your-sweet-lib', // Site title.
  siteTitleAlt: 'A Skinny Gatsby Starter Template for Creating Docs', // Alternative site title for SEO.
  siteDescription: 'Get your docs up and going with Gatsby.', // Website description used for RSS feeds/meta description tag.
  docsDir: 'docs', // The name of the directory that contains lessons or docs.
  siteFBAppID: 'optional facebook app id for open graph in SEO.jsx',
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
  theme_color: '#0074AB',
  siteTwitterId: '@graysonhicks',
};
module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: config,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`crimson text:400, 400i, 700, 700i`, `space mono:400,700`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content/docs/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.theme_color,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.background_color,
        theme_color: config.theme_color,
        display: 'minimal-ui',
        icons: [
          {
            src: config.siteLogo,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: config.siteLogo,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};

module.exports = {
  docsDir: 'docs', // The name of the directory that contains lessons or docs.
  siteTitle: 'your-sweet-lib', // Site title.
  siteTitleAlt: 'A Skinny Gatsby Starter Template for Creating Docs', // Alternative site title for SEO.
  siteLogo: '/logos/261d.png', // Logo used for SEO and manifest.
  siteUrl: 'https://github.com/graysonhicks/gatsby-starter-skinny-docs', // Domain of your website without pathPrefix.
  pathPrefix: '/gatsby-starter-skinny-docs', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'Get your docs up and going with Gatsby.', // Website description used for RSS feeds/meta description tag.
  userTwitter: 'optional twitter user name for twitter cards in SEO.jsx', // Optionally renders "Follow Me" in the UserInfo segment.
  siteFBAppID: 'optional facebook app id for open graph in SEO.jsx',
  userAvatar: 'https://api.adorable.io/avatars/150/test.png', // Optional user avatar .
  userDescription: 'Front-end developer @ github.com', // Optional user description .
  // Links to social profiles/projects if you want to display in the navigation bar/elsewhere.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/graysonhicks',
      iconClassName: 'fa fa-github',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/graysonhicks',
      iconClassName: 'fa fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:graysonhicks@gmail.com',
      iconClassName: 'fa fa-envelope',
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com/jamesgraysonhicks',
      iconClassName: 'fa fa-instagram',
    },
  ],
  copyright: 'Copyright © 2018. Grayson Hicks', // Copyright string for the footer of the website and RSS feed.
  themeColor: '##0074AB', // Used for setting manifest and progress theme colors.
  backgroundColor: '#e0e0e0', // Used for setting manifest background color.
};

import React, { Component } from 'react';
import Helmet from 'react-helmet';

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    const {
      siteTitle,
      siteTitleAlt,
      siteDescription,
      siteFullUrl,
      siteLogo,
      siteFBAppID,
      siteTwitterId,
    } = this.props.siteMetadata;

    let title;
    let description;
    let image;
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      title = postMeta.title;
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      image = postMeta.cover;
      postURL = siteFullUrl + postPath;
    } else {
      title = siteTitle;
      description = siteDescription;
      image = siteLogo;
    }

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteFullUrl,
        name: title,
        alternateName: siteTitleAlt,
      },
    ];
    if (postSEO) {
      schemaOrgJSONLD.push([
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postURL,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: siteFullUrl,
          name: title,
          alternateName: siteTitleAlt,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
        },
      ]);
    }
    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : siteFullUrl} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={siteFBAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteTwitterId} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;

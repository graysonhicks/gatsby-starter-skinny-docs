import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import config from '../../data/SiteConfig';

import Navigation from '../components/Layout/Navigation';
import Body from '../components/Layout/Body';

// Home page component
// Queries all markdown docs
// Also gets logo and background image
// Background image query and component can be removed and a solid color set where now transparent in the hero and navigation

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const siteMetadata = this.props.data.site.siteMetadata;
    const { siteTitle, siteDescription } = siteMetadata;
    const { resolutions } = this.props.data.logo.childImageSharp;
    const { sizes } = this.props.data.bg.childImageSharp;

    return (
      <div className="index-container">
        <Helmet title={config.siteTitle} />
        <SEO postEdges={postEdges} siteMetadata={siteMetadata} />
        <main>
          <IndexHeadContainer>
            <Navigation />
            <Hero>
              <Img resolutions={resolutions} />
              <h1>{siteTitle}</h1>
              <h4>{siteDescription}</h4>
              <Img
                sizes={sizes}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                }}
              />
            </Hero>
          </IndexHeadContainer>
          <Body />
        </main>
      </div>
    );
  }
}

export default Index;

const IndexHeadContainer = styled.div`
  background: transparent;
  padding: ${props => props.theme.sitePadding};
  text-align: center;
  position: relative;
`;

const Hero = styled.div`
  color: white;
  padding: 50px 0;
  & > h1 {
    font-weight: 600;
  }
`;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteTitle
        siteTitleAlt
        siteDescription
        siteFullUrl
        siteLogo
        siteFBAppID
        siteTwitterId
      }
    }
    allMarkdownRemark(limit: 2000) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
          }
        }
      }
    }
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        resolutions(width: 127, height: 127) {
          ...GatsbyImageSharpResolutions
        }
      }
    }

    bg: file(relativePath: { eq: "bg.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 3600) {
          ...GatsbyImageSharpSizes_noBase64
        }
      }
    }
  }
`;

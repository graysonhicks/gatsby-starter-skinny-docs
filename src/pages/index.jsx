import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Img from 'gatsby-image';

import SEO from '../components/SEO';

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
    // getting logo using sharp resolutions
    const { resolutions } = this.props.data.logo.childImageSharp;
    // getting a hero background image using sharp sizes (not using, but this is how would get from query below)
    const { sizes } = this.props.data.bg.childImageSharp;

    return (
      <div className="index-container">
        <Helmet title={siteTitle} />
        <SEO postEdges={postEdges} siteMetadata={siteMetadata} />
        <main>
          <IndexHeadContainer>
            <Navigation />
            <Hero>
              <Img resolutions={resolutions} />
              <Title>{siteTitle}</Title>
              <Description>{siteDescription}</Description>
              {/* Hero Background as Image <Img
                sizes={sizes}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1,
                }}
              /> */}
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
  /* Change this background to transparent if you want an image background for the hero */
  background-color: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
  text-align: center;
  position: relative;
`;

const Hero = styled.div`
  color: white;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Description = styled.p``;

/* eslint no-undef: "off" */
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

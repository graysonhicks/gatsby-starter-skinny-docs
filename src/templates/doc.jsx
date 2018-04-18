import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link';

import SEO from '../components/SEO';
import SiteHeader from '../components/Layout/Header';
import TableOfContents from '../components/Layout/TableOfContents';

export default class DocTemplate extends React.Component {
  render() {
    console.log(this.props);

    const { slug } = this.props.pathContext;
    const siteMetadata = this.props.data.site.siteMetadata;
    const { siteTitle } = siteMetadata;
    const postNode = this.props.data.postBySlug;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }

    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${siteTitle}`}</title>
        </Helmet>
        <SEO
          postPath={slug}
          postNode={postNode}
          postSEO
          siteMetadata={siteMetadata}
        />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader location={this.props.location} />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents posts={this.props.data.tableOfContents} />
          </ToCContainer>
          <BodyContainer>
            <div>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    );
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`;

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`;

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
  @media screen and (max-width: 600px) {
    order: 1;
  }
`;

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DocsBySlug($slug: String!) {
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
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
      }
    }
    tableOfContents: docsJson {
      possibleProp
      chapters {
        title
        subchapters {
          title
          sections {
            post {
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import SEO from '../components/SEO';
import MainHeader from '../components/Layout/Header';
import Demo from '../components/Demo/Demo';

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`;

class AboutPage extends React.Component {
  render() {
    const {
      siteTitle,
      siteDescription,
      siteLogo,
    } = this.props.data.site.siteMetadata;

    return (
      <div className="index-container">
        <main>
          <MainHeader
            siteTitle={siteTitle}
            siteDescription={siteDescription}
            location={this.props.location}
            logo={siteLogo}
          />
          <BodyContainer>
            <Demo />
          </BodyContainer>
        </main>
      </div>
    );
  }
}

export default AboutPage;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteLogo
      }
    }
  }
`;

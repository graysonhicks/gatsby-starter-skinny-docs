import React from 'react';
import styled from 'styled-components';

import MainHeader from '../components/Layout/Header';
import Demo from '../components/Demo/Demo';

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

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
`;

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

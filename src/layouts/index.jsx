import React from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import globalStyles from './css/globalStyles';
import './css/code.css';
import theme from './theme';

class MainLayout extends React.Component {
  getLocalTitle(pathPrefix) {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, '')
      .replace('/', '');
    let title = '';

    if (currentPath === '') {
      title = 'Home';
    } else {
      title = capitalize(currentPath);
    }

    return title;
  }

  render() {
    const { children } = this.props;
    const { siteMetadata } = this.props.data.site;
    const { pathPrefix, siteDescription, siteTitle } = siteMetadata;

    return (
      <div>
        <Helmet>
          <title>{`${this.getLocalTitle(pathPrefix)} | ${siteTitle}`}</title>
          <meta name="description" content={siteDescription} />
        </Helmet>
        <ThemeProvider theme={theme}>{children()}</ThemeProvider>
      </div>
    );
  }
}

export default MainLayout;

export const MainLayoutQuery = graphql`
  query MainLayoutQuery {
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
  }
`;

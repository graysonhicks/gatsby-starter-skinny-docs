import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

class MainHeader extends React.Component {
  render() {
    return (
      <SiteContainer>
        <Navigation />
      </SiteContainer>
    );
  }
}

export default MainHeader;

const SiteContainer = styled.div`
  background: ${props => props.theme.brand};
  padding: ${props => props.theme.sitePadding};
  text-align: center;
`;

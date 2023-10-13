import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
  html {
    height: 100%;
  }
`;
// color: ${props => props.theme.color};

export const Wrapper = styled.div`
    padding: 5px;
    background: ${props => props.theme.background};

`;
export const Container = styled.div`
    padding: 0 10px;
    max-width: 1180px;
    margin: 0 auto;
`;
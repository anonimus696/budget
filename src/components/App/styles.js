import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: auto;
    background: ${props => props.theme.background};
    font-family: DM Sans;
  }
  html {
    height: 100%;
  }
`;
// color: ${props => props.theme.color};

export const Wrapper = styled.div`
    padding: 5px;
`;
export const Container = styled.div`
    padding: 0 10px;
    max-width: 1180px;
    margin: 0 auto;
`;
import styled from "styled-components";

export const AboutWrapper = styled.div`
background-color: ${props => props.theme.secondary};
color: ${props => props.theme.color};
border-radius: 20px;
padding: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
& a{
    color: ${props => props.theme.color};
    transition: all 0.3s ease 0s;
    &:hover{
    color: #4318FF;
    }
}


& p {
    font-weight: bold;
}
`;

AboutWrapper.displayName = 'AboutWrapper';
import styled from 'styled-components'


export const Nav = styled.nav`

    ul{
        display: flex;
        list-style: none;
        gap: 15px;
        padding: 0;
        padding-left: 5px;
        transition: all 0.8s ease 0s;
    }

    
    li a{
        color: ${({ theme }) => theme.linkColor};
        font-size: 16px;
        text-decoration: none;
        transition: all 0.3s ease 0s;
    }
    li a:hover{
        color: rgb(66, 142, 204);
        text-decoration: underline;
    }
`;

Nav.displayName = 'Button';

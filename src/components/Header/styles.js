import styled from 'styled-components'


export const Nav = styled.nav`

    padding: 0 10px;
    ul{
        display: flex;
        list-style: none;
        gap: 20px;
        padding: 0;
        padding-left: 5px;
        transition: all 0.8s ease 0s;
    }

    
    li a{
        color: ${({ theme }) => theme.color};
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 30px; 
        text-decoration: none;
        transition: all 0.3s ease 0s;
    }


    @media (min-width: 767.98px) {
        li a:hover{
        color: #4318FF;
    }
  }

    .linkContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        & svg{
            display: none;
            max-width: 20px;
        }
    }

    @media (max-width:767.98px){
        position: fixed;
        bottom: 0;
        left: 0px;
        z-index: 2;
        padding: 10px 0 10px 0;
        background-color: ${({ theme }) => theme.secondary};
        width: 100%;


        ul{
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        margin: 0;
        gap: 5px;
        }

        li {
        & a{
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; 
        }
        & .marked{
            color: #7551FF;
        }
    }

        .linkContainer{
        & svg{
            display: block;
            & path{
                fill: ${({ theme }) => theme.color};
            }
        }
    }

    .marked.linkContainer {
        & svg{
            & path{
                fill: #7551FF;
            }
        }
    }
}

`;

Nav.displayName = 'Button';






export const HeaderContainer = styled.div`
display: flex;

justify-content: space-between;
align-items: center;
.container{
        display: flex;
        gap: 40px;
    }



    @media (max-width:767.98px){
    margin-bottom: 15px;

        .container{
            width: 100%;
            justify-content: space-between;
            gap: 5px;
        }
}
`;

HeaderContainer.displayName = 'HeaderContainer';
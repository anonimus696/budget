import styled from 'styled-components'

export const TransactionsWraper = styled.div`


`;

// Filter, FilterButton

export const Filter = styled.div`
display: flex;
gap: 10px;
padding: 5px 0 10px 0;
@media (max-width:479.98px){
gap: 5px;
padding: 0px 0 7px 0;
font-size: 14px;

}
`;

Filter.displayName = 'Filter';

export const FilterButton = styled.div`
color:  ${({ theme }) => theme.linkColor};
background-color:  transparent;
border: 1px solid ${({ theme }) => theme.linkColor};
padding: 5px 10px;
border-radius: 20px;
cursor: pointer;
display: flex;
align-items: center;
gap: 10px;
transition: all 0.3s ease 0s;


@media (max-width:479.98px){
padding: 5px 7px;
}

@media (min-width:767.98px){
    &:hover{
    background-color:  ${({ theme }) => theme.linkColor};
    color: #fff;
    }
    }



&.filtered{
    background-color:  ${({ theme }) => theme.linkColor};
    color: #fff;
}



`;

FilterButton.displayName = 'FilterButton';
/* background-color: ${({ theme }) => theme.secondary}; */

import styled from 'styled-components'



export const TransactionsWraper = styled.div`
background-color: ${props => props.theme.secondary};
border-radius: 20px;
padding:  10px 10px 60px 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

overflow: hidden;
scroll-behavior: smooth;

.list{
overflow: hidden;

}
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
padding: 5px 15px;
border-radius: 20px;
font-size: 14px;
cursor: pointer;
display: flex;
align-items: center;
gap: 10px;
transition: all 0.3s ease 0s;


@media (max-width:479.98px){
padding: 5px 7px;
font-size: 12px;

}

@media (min-width:767.98px){
    &:hover{
    background-color:  #4318FF;
    border: 1px solid #4318FF;
    color: #fff;
    }
    }



&.filtered{
    background-color:  #4318FF;
    color: #fff;
}



`;

FilterButton.displayName = 'FilterButton';
/* background-color: ${({ theme }) => theme.secondary}; */

import styled from 'styled-components'

export const Wrapper = styled.div`
background: ${({ value }) => value > 0 ? '#6ffa8d' : '#ff8383'};
border: 1px solid #dbdbdb;
border-radius: 3px;
padding: 5px;
margin-bottom: 10px;
display: flex;
justify-content: space-between;
align-items: center;
`;

Wrapper.displayName = 'TransactionWrapper'

export const TransactionDate = styled.div`
flex: 1 1 30%;

`;
TransactionDate.displayName = 'TransactionDate'


export const Value = styled.div`
flex: 1 1 30%;


`;
TransactionDate.displayName = 'Value'

export const Comment = styled.div`
flex: 1 1 40%;


`;
TransactionDate.displayName = 'Comment'


export const Icon = styled.span`
img{
    max-width: 20px;
    margin-right: 15px;
}


`;
Icon.displayName = 'Icon'
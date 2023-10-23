import styled from 'styled-components'

export const Charts = styled.div`
display: flex;
min-height: 300px;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
margin-bottom: 70px;

.caharts__barcontainer{
    display: flex;
}
.charts__buttons{
    display: flex;
    justify-content: end;
    margin-right: 25px;
}
`;
Charts.displayName = 'FilterButton';


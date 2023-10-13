import styled from 'styled-components'

export const Wrapper = styled.div`
background: ${({ value }) => value > 0 ? 'lightgreen' : 'pink'};
border: 1px solid #dbdbdb;
border-radius: 3px;
padding: 5px 10px;
display: flex;
height: 60px;
border-radius: 10px;
justify-content: space-between;
align-items: center;
gap: 15px;

@media (max-width:767.98px){
  font-size: 12px;
  gap: 10px;
  text-align: center;
  padding: 5px;

}

`;

Wrapper.displayName = 'TransactionWrapper'

export const TransactionDate = styled.div`
flex: 1 1 30%;
@media (max-width:767.98px){
}
`;
TransactionDate.displayName = 'TransactionDate'


export const Value = styled.div`
flex: 1 1 30%;
@media (max-width:767.98px){
}

`;
Value.displayName = 'Value'

export const Comment = styled.div`
flex: 1 1 40%;
@media (max-width:767.98px){
  word-break: break-word;
}
`;
Comment.displayName = 'Comment'


export const Icon = styled.span`
img{
    max-width: 20px;
}


`;
Icon.displayName = 'Icon'

// CloseContainer, LeftRight, RightLeft

export const CloseContainer = styled.div`
  margin: 0;
  border: 0;
  padding: 0;
  background: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;

  .smaler{
    background-color: red;
  }

  &:hover,
  &:focus {
    transform: rotateZ(90deg);
    background: hsl(216, 100, 40);
  }

`;
TransactionDate.displayName = 'CloseContainer'

export const LeftRight = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: 10px;
  height: 10px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    right: 0;
    height: 2px;
    background: #4318FF;
    border-radius: 2px;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  span {
    display: block;
  }
`;
TransactionDate.displayName = 'LeftRight'

export const RightLeft = styled.div`
visibility: hidden;
`;
TransactionDate.displayName = 'RightLeft'
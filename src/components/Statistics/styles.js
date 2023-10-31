import styled from 'styled-components'



export const ChartsWrapper = styled.div`


h2{
    margin: 10px 0;
    color: ${({ theme }) => theme.color};

    & span{
        text-decoration: underline;
    }
}

.allcontainer{
  border-radius: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 100px;
}
.buttoncontainer{
    &__chartbutton{
    background-color: #4318FF;
    border: 1px solid ${({ theme }) => theme.linkColor};
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}
}
.svg-icon {
  width: 26px;
  height: 26px;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #fff;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
@media (min-width: 767.98px) {
  .buttoncontainer{
    &__chartbutton:hover{
      background-color: transparent;

      .svg-icon path {
      fill: ${({ theme }) => theme.linkColor};
    }
    }
  }
}

`;
ChartsWrapper.displayName = 'ChartsWrapper';

export const Charts = styled.div`
display: flex;
min-height: 300px;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
margin-bottom: 70px;
gap: 27px;


.caharts__barcontainer{
    display: flex;
}
.charts__buttons{
    display: flex;
    justify-content: end;
    margin-right: 25px;
}


`;
Charts.displayName = 'Charts';



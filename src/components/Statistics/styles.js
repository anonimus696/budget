import styled from 'styled-components'


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


export const ChartsWrapper = styled.div`

h2{
    & span{
        text-decoration: underline;
    }
}

.buttoncontainer{

    &__chartbutton{
    background-color: blue;
    display: inline-block;
    padding: 5px 10px;

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
}
}

`;
ChartsWrapper.displayName = 'ChartsWrapper';
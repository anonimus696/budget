import styled from 'styled-components'


export const Wrapper = styled.div`
border-radius: 5px;
padding: 5px;
margin-bottom: 5px;
max-width: 500px;
.formitems{
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 15px;
}
.formitems__content{
    display: grid;
    gap: 5px;

}
.formitems__item{
    flex: 1 1 50%;
    background-color: #fff;
    box-shadow: 2px 5px 0px 0px rgba(0,0,0,0.1);
    padding: 10px 10px;
    border-radius: 20px;
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
}
.formitems__title{
    font-size: 14px;
    color: ${({ theme }) => theme.linkColor};
}

.formitems__value{
    font-weight: 800;
    color: ${({ theme }) => theme.color};
}
.formitems__icon{
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.linkColor};
    border-radius: 50%;
    padding: 8px 15px;
    font-size: 25px;
    display: flex;
    align-items: center;
    &-svg{
        padding: 10px;
    }
}
`;

Wrapper.displayName = 'FormWrapper';


export const Colomn = styled.div`
display: flex;
flex-direction: column;
gap: 10px;

`;

export const Input = styled.input`
padding: 0 5px;
border: 1px solid #000;
border-radius: 5px;
min-width: 80px;
height: 40px;
outline: none;
transition: all 0.3s ease 0s;

&:focus{
    border: 1px solid rgb(66, 142, 204);
    box-shadow: 1px 1px 0 0  rgb(66, 142, 204);
}
`;

Input.displayName = 'Input';

// export const Comment = styled.textarea`
export const Comment = styled.select`
padding: 5px;
border-radius: 5px;
min-width: 80px;
height: 40px;
outline: none;
transition: all 0.3s ease 0s;

&:focus{
    border: 1px solid rgb(66, 142, 204);
    box-shadow: 1px 1px 0 0  rgb(66, 142, 204);
}
`;

Input.displayName = 'Comment';

export const Button = styled.button`
padding: 10px 50px;
/* border-radius: 20px; */
border: 1px solid rgb(66, 142, 204);
background-color: ${({ theme }) => theme.linkColor};
color: #fff;
min-width: 80px;
height: 40px;
transition: all 0.3s ease 0s;
margin-bottom: 15px;
&.chosen { 
    color: ${({ theme }) => theme.linkColor};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.linkColor};
}
&.active { 
    background-color:  ${({ theme }) => theme.linkColor};
    color: #fff;
    box-shadow: 2px 2px 2px 2px  ${({ theme }) => theme.linkColor};
    &:hover{
    background-color:  ${({ theme }) => theme.linkColor};
    color: #fff;
    }
}
&:hover{
    color: ${({ theme }) => theme.linkColor};
    background-color: transparent;
    box-shadow: 2px 2px 2px 2px  ${({ theme }) => theme.linkColor};
    cursor: pointer;
}
`;

Input.displayName = 'Button';
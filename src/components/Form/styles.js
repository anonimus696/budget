import styled from 'styled-components'


export const Wrapper = styled.div`
border: 1px solid #dbdbdb;
border-radius: 5px;
padding: 5px;
margin-bottom: 10px;
max-width: 500px;
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

export const Comment = styled.textarea`
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
padding: 5px;
border-radius: 5px;
border: 1px solid rgb(66, 142, 204);
background-color: #54b2ff;
color: #fff;
min-width: 80px;
height: 40px;
transition: all 0.3s ease 0s;

&:hover{
    background-color: rgb(66, 142, 204);
    box-shadow: 1px 1px 0 0  rgb(66, 142, 204);
    cursor: pointer;
}
`;

Input.displayName = 'Button';
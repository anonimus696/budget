import { useState } from "react";
import { Modal } from "../Modal"
import Form from "../Form"
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';//!



const Button = styled.div`
/* position: fixed; */
/* right: 50px;
bottom: 50px; */
max-width: 185px;
height: 40px;
padding: 5px 15px;
font-size: 36px;
font-weight: 800;
background-color: ${({ theme }) => theme.linkColor};
border: 1px solid ${({ theme }) => theme.linkColor};
color: #fff;
border-radius: 25px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
opacity: 1;
align-self: center;
/* z-index: 2; */
&:hover{
    background: #fff;
    color: ${({ theme }) => theme.linkColor};
    transition: all 0.3s ease 0s;
}
/*
@media (max-width:767.98px){
position: fixed; 
left: calc(50%-52px);
bottom: 5%; 
z-index: 2;
}
*/
@media (max-width:767.98px){
margin-top: -35px
}
`

export const ChangeBalance = ({ onChange }) => {
    const [openModal, setOpenModal] = useState(false);

    //!
    const location = useLocation();
    const isBudgetPage = location.pathname.endsWith('/');

    const navigate = useNavigate(); // Get the navigate function

    const checkLocal = () => {
        if (isBudgetPage) {
            setOpenModal(true)
        } else {
            // Navigate to the Home component
            navigate('/');
            // Open the modal
            setOpenModal(true);
        }
    }

    //!
    return (
        <>
            <Button onClick={checkLocal}>+</Button>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Form onChange={onChange} onCloseFormModal={() => setOpenModal(false)} />
            </Modal>
        </>
    )
}
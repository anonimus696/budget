import { useState } from "react";
import { Modal } from "../Modal"
import Form from "../Form"
import styled from "styled-components";


const Button = styled.div`
position: fixed;
right: 50px;
bottom: 50px;
width: 50px;
height: 50px;
font-size: 50px;
background-color: #fff;
border-radius: 25px;
border: 2px solid lightgray;
outline: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
opacity: 1;
z-index: 2;
`

export const ChangeBalance = ({ onChange }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>+</Button>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Form onChange={onChange} onCloseFormModal={() => setOpenModal(false)} />
            </Modal>
        </>
    )
}
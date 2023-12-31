
import React, { useRef } from "react";
import { Portal } from "../Portal";
import styled from "styled-components";

const Backdrop = styled.div`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: rgba(51, 51, 51, 0.3);
backdrop-filter: blur(1px);
display: flex;
align-items: center;
justify-content: center;
opacity: 1;
z-index: 3;
`
const Content = styled.div`
position: relative;
padding: 20px;
box-sizing: border-box;
min-height: 50px;
min-width: 350px;
max-height: 100%;
max-width: 100%; 
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
background-color: ${({ theme }) => theme.background};
border-radius: 20px;
transform: translateY(0);
opacity: 1;
`

export const Modal = ({ open, onClose, children }) => {
    const backdrop = useRef(null);
    if (!open) {
        return null;
    }

    const onClick = (e) => {
        if (backdrop.current === e.target) {
            onClose();
        }
    }
    return (
        <Portal>
            <Backdrop ref={backdrop} onClick={onClick}>
                <Content>
                    {children}
                </Content>
            </Backdrop>
        </Portal>
    )
}

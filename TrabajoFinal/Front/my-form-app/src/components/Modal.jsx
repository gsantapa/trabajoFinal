import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const Modal = ({ message, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

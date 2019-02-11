import React, {Component ,Fragment} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const RBModal = ({text, isOpen, onClose, children, close}) =>
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Woord"
        className="rb-modal"
    >
      <h2>{text}</h2>
        {children}
        { close && <a onClick={onClose}>Sluit dit venster</a>}
    </Modal>;

export default RBModal;

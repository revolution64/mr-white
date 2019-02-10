import React, {Component ,Fragment} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const RBModal = ({content, isOpen, onClose}) =>
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Woord"
        className="rb-modal"
    >
      <h1>{content}</h1>
      <a onClick={onClose}>Sluit dit venster</a>
    </Modal>;

export default RBModal;

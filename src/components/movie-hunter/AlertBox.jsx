import React from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function AlertBox({
  modal,
  modalClickHandle,
  modalContent,
  modalTitle,
}) {
  return (
    <Modal isOpen={modal} backdrop="static" centered>
      <ModalHeader>{modalTitle}</ModalHeader>
      <ModalBody>
        {modalContent}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => modalClickHandle(true)}>
          Confirm
        </Button>
        <Button color="secondary" onClick={() => modalClickHandle(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

AlertBox.propTypes = {
  modalClickHandle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  modalContent: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
};

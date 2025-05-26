// import {
//   Modal, ModalHeader, ModalBody, ModalFooter, Button,
// } from 'reactstrap';

type AlertBoxProps = {
  isModalOpen: boolean;
  modalClickHandle: (bool: boolean) => void;
  modalContent: React.ReactNode;
  modalTitle: string;
};

export default function AlertBox({
  isModalOpen,
  modalContent,
  modalTitle,
  modalClickHandle,
}: AlertBoxProps) {
  return (
    <Modal isOpen={isModalOpen} backdrop="static" centered>
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
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { TModalPlacement } from "@/app/types";

export default function BaseModal({
  modalPlacement,
  title,
  body,
  onSubmit,
  isOpen,
  onOpenChange,
}: {
  modalPlacement: TModalPlacement;
  title: string;
  body: JSX.Element;
  onSubmit: any;
  isOpen: boolean;
  onOpenChange: any;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      {/* <Button onPress={onOpen} className="max-w-fit">
        Open Modal
      </Button> */}
      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>{title}</span>
              </ModalHeader>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

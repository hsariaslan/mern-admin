import {Button, Modal} from 'react-bootstrap';
import UserModel from "../features/users/User";
import {ReactElement} from "react";
import ButtonWithSpinner from "./ButtonWithSpinner";

interface ModalComponentProps {
    title: string,
    content?: string,
    confirmButton: {
        text: string,
        variant: string,
        form?: string,
        disabled: boolean,
        type?: "button" | "submit" | "reset",
        isbuttonwithspinner?: string,
    },
    cancelButton?: {
        text: string,
        variant?: string,
    },
    onDismiss: () => void,
    onConfirm: (param?: UserModel | any) => void,
    children?: ReactElement,
}

export default function ModalComponent({
                                           title,
                                           content,
                                           confirmButton,
                                           cancelButton,
                                           onDismiss,
                                           onConfirm,
                                           children
                                       }: ModalComponentProps) {
    return (
        <>
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content ? <p>{content}</p> : ''}
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={cancelButton?.variant ?? "secondary"} onClick={onDismiss} className="py-1.5 h-10">
                        {cancelButton?.text ?? "Cancel"}
                    </Button>
                    {confirmButton?.isbuttonwithspinner
                        ? <ButtonWithSpinner
                            {...confirmButton}
                            type={confirmButton.type ?? "button"}
                            onClick={onConfirm}
                        />
                        : <Button
                            {...confirmButton}
                            type={confirmButton.type ?? "button"}
                            onClick={onConfirm}
                            className="py-1.5 h-10"
                        >
                            {confirmButton.text}
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}
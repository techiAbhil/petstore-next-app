import Modal from 'react-bootstrap/Modal';

function AlertModal({
    title,
    content,
    footer,
    show,
    onClose,
}: {
    title?: string;
    content: string;
    show: boolean;
    footer?: string;
    onClose: any;
}) {
    return (
        <Modal centered={true} show={show} onHide={onClose}>
            {title && (
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            )}

            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
    );
}

export default AlertModal;

import { ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function CustomToaster({
    headerContent,
    bodyContent,
    onClose,
    position = 'middle-center',
    className = 'error-toaster',
}: {
    headerContent: any;
    bodyContent: any;
    onClose: any;
    position?: ToastPosition;
    className?: string;
}) {
    return (
        <ToastContainer className={className} position={position}>
            <Toast onClose={onClose} delay={5000} autohide>
                <Toast.Header className={className}>
                    {headerContent}
                </Toast.Header>
                <Toast.Body>{bodyContent}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default CustomToaster;

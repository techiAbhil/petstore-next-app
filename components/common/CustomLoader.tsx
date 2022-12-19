import { Modal, Spinner } from 'react-bootstrap';

const CustomLoader = ({ show }: { show: boolean }) => {
    return (
        <Modal size="sm" centered={true} show={show} className="loading-modal">
            <Spinner animation="border" variant="warning" />
        </Modal>
    );
};

export default CustomLoader;

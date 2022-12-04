import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDropzone } from 'react-dropzone';
import AuthLayout from '../../components/layout/auth-layout';
import StyledDropzone from '../../components/styled-dropzone/styled-dropdzone';

const Register = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);

    const handleClose = () => setShowFileUploadModal(false);
    const handleShow = () => setShowFileUploadModal(true);
    return (
        <AuthLayout>
            <>
                <form className="mt-2">
                    <p className="text-center text-uppercase text-secondary fw-bold">
                        Lets create your profile
                    </p>

                    <div
                        title="Upload Profile Pic"
                        className="form-group d-flex justify-content-center"
                        onClick={handleShow}
                    >
                        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                            <i className="fa-solid fa-user fa-3x avatar-icon"></i>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Phone No."
                        />
                    </div>

                    <div className="form-group">
                        <Form.Select aria-label="Default select example">
                            <option>Country</option>
                            <option value="1">India</option>
                            <option value="2">Japan</option>
                        </Form.Select>
                    </div>

                    <div className="form-group pt-3">
                        <Form.Select aria-label="Default select example">
                            <option>City</option>
                            <option value="1">Pune</option>
                            <option value="2">Mumbai</option>
                        </Form.Select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Address"
                        />
                    </div>

                    <div className="form-group py-3">
                        <Button className="btn btn-block login-btn w-100">
                            Save
                        </Button>
                    </div>
                </form>
            </>

            <Modal
                size="sm"
                centered={true}
                show={showFileUploadModal}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StyledDropzone />
                </Modal.Body>
            </Modal>
        </AuthLayout>
    );
};

export default Register;

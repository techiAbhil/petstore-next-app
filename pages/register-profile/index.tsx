import axios from 'axios';
import { Form as FormikForm, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/common/AlertModal';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomFormikSelect from '../../components/common/CustomFormikSelect';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import StyledDropzone from '../../components/styled-dropzone/styled-dropdzone';
import { RootState } from '../../store/store';
import { profileRegistrationSchema } from '../../validations/auth.validation';

const Register = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);

    const handleClose = () => setShowFileUploadModal(false);
    const handleShow = () => setShowFileUploadModal(true);
    const router = useRouter();
    const { email, password } = useSelector(
        (state: RootState) => state.registration
    );
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );

    const [isUserRegistred, setIsUserRegistred] = useState<boolean>(false);

    useEffect(() => {
        // if (!email || !password) router.push('/register');
    }, [email, password, router]);

    const [showLoader, setShowLoader] = useState<boolean>(false);

    const submitHandler = useCallback(
        async ({ name, phone, country, city, address }: any) => {
            try {
                setShowLoader(true);
                await axios.post('/auth/register', {
                    name,
                    email,
                    password,
                    phone,
                    country,
                    city,
                    address,
                });
                setShowLoader(false);
                setIsUserRegistred(true);
            } catch (e: any) {
                setShowLoader(false);
                console.log(e);
                setServiceError(
                    e?.response?.data?.message ?? 'Something went wrong!'
                );
            }
        },
        [email, password]
    );
    return (
        <AuthLayout>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    country: '',
                    city: '',
                    address: '',
                }}
                validationSchema={profileRegistrationSchema}
                onSubmit={submitHandler}
            >
                <FormikForm className="mt-2">
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

                    <div className="form-group pt-3">
                        <CustomFormikField
                            className="form-control"
                            placeholder="Full Name"
                            name="name"
                        />
                    </div>

                    <div className="form-group pt-3">
                        <CustomFormikField
                            className="form-control"
                            placeholder="Phone No."
                            name="phone"
                            type="tel"
                        />
                    </div>

                    <div className="form-group pt-3">
                        <CustomFormikSelect name="city">
                            <option disabled value="">
                                City
                            </option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hydrabad">Hydrabad</option>
                        </CustomFormikSelect>
                    </div>

                    <div className="form-group pt-3">
                        <CustomFormikSelect name="country">
                            <option disabled value="">
                                Country
                            </option>
                            <option value="India">India</option>
                            <option value="Japan">Japan</option>
                        </CustomFormikSelect>
                    </div>

                    <div className="form-group">
                        <CustomFormikField
                            className="form-control my-3"
                            placeholder="Address"
                            name="address"
                        />
                    </div>

                    <div className="form-group py-3">
                        <Button
                            type="submit"
                            className="btn btn-block login-btn w-100"
                        >
                            Save
                        </Button>
                    </div>
                </FormikForm>
            </Formik>

            {serviceError && (
                <CustomToaster
                    bodyContent={serviceError}
                    headerContent={<strong className="me-auto">Error</strong>}
                    onClose={() => setServiceError(undefined)}
                />
            )}
            <AlertModal
                title="Congratulations"
                content="You have been successfully registred!"
                onClose={() => {
                    setIsUserRegistred(false);
                    setTimeout(() => {
                        router.push('/login');
                    }, 300);
                }}
                show={isUserRegistred}
            />
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

            <CustomLoader show={showLoader} />
        </AuthLayout>
    );
};

export default Register;

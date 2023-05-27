import axios from 'axios';

import { Formik, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AlertModal from '../../components/common/AlertModal';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import ProfileDisplay from '../../components/common/ProfileDisplay';
import CustomToaster from '../../components/common/Toaster';
import Layout from '../../components/layout/layout';
import StyledDropzone from '../../components/styled-dropzone/styled-dropdzone';
import { getPetsMetaData } from '../../store/pets-params-slice';
import { RootState, useAppDispatch } from '../../store/store';
import { setUserState } from '../../store/userSlice';
import { updateUserLocalStorageStateByToken } from '../../utils/helper';
import { profileRegistrationSchema } from '../../validations/auth.validation';

const Profile = () => {
    const storedUserDetails = useSelector((state: RootState) => state.user);

    const [showFileUploadModal, setShowFileUploadModal] = useState(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPetsMetaData(undefined));
    }, [dispatch]);

    const [isUpdatedUserDetails, setIsUpadedUserDetails] =
        useState<boolean>(false);
    const handleClose = () => setShowFileUploadModal(false);
    const handleShow = () => setShowFileUploadModal(true);
    const router = useRouter();
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );

    const [showLoader, setShowLoader] = useState<boolean>(false);

    const submitHandler = useCallback(
        async (values: any) => {
            try {
                setShowLoader(true);
                const {
                    data: { updatedToken },
                } = await axios.patch('/update-user-info', {
                    ...values,
                });
                if (!updatedToken) {
                    throw new Error('Something went wrong!');
                }
                const userDetails =
                    updateUserLocalStorageStateByToken(updatedToken);
                dispatch(setUserState(userDetails));

                setShowLoader(false);
                setIsUpadedUserDetails(true);
            } catch (e: any) {
                setShowLoader(false);
                console.log(e);
                setServiceError(e?.message ?? 'Something went wrong!');
            }
        },
        [dispatch]
    );

    const onDrop = useCallback(
        async (acceptedFiles: any[], rejectedFiles: any[]) => {
            if (rejectedFiles.length > 0) {
                setServiceError('Please select a valid file');
                return;
            }
            try {
                setShowLoader(true);
                const formData = new FormData();
                formData.append('us_profile_image', acceptedFiles[0]);

                const {
                    data: { updatedToken },
                } = await axios.patch('/update-profile-pic', formData);
                const userDetails =
                    updateUserLocalStorageStateByToken(updatedToken);
                dispatch(setUserState(userDetails));
                setShowLoader(false);
                setShowFileUploadModal(false);
            } catch (e) {
                setShowLoader(false);
                setShowFileUploadModal(false);
                setTimeout(() => setServiceError('Image Upload error'), 200);
            }
        },
        [dispatch]
    );

    return (
        <Layout>
            <div className="d-flex justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-10">
                    {storedUserDetails && (
                        <Formik
                            initialValues={{
                                us_full_name: storedUserDetails.us_full_name,
                                us_country: storedUserDetails.us_country,
                                us_city: storedUserDetails.us_city,
                                us_address: storedUserDetails.us_address,
                                us_phone: storedUserDetails.us_phone,
                                us_email: storedUserDetails.us_email,
                            }}
                            validationSchema={profileRegistrationSchema}
                            onSubmit={submitHandler}
                        >
                            <FormikForm className="mt-2">
                                <p className="text-center text-uppercase text-secondary fw-bold">
                                    Your profile
                                </p>

                                <div
                                    // title="Upload Profile Pic"
                                    className="form-group d-flex justify-content-center"
                                    // onClick={handleShow}
                                >
                                    <ProfileDisplay />
                                </div>

                                <div className="form-group pt-3">
                                    <CustomFormikField
                                        className="form-control"
                                        placeholder="Phone No."
                                        name="us_phone"
                                        type="tel"
                                        disabled
                                    />
                                </div>

                                <div className="form-group pt-3">
                                    <CustomFormikField
                                        className="form-control"
                                        placeholder="Email"
                                        name="us_email"
                                        disabled
                                    />
                                </div>

                                <div className="form-group pt-3">
                                    <CustomFormikField
                                        className="form-control"
                                        placeholder="Full Name"
                                        name="us_full_name"
                                        disabled
                                    />
                                </div>

                                <div className="form-group pt-3">
                                    <CustomFormikField
                                        className="form-control"
                                        placeholder="city"
                                        name="us_city"
                                        disabled
                                    />
                                </div>

                                <div className="form-group pt-3">
                                    <CustomFormikField
                                        className="form-control"
                                        placeholder="country"
                                        name="us_country"
                                        disabled
                                    />
                                </div>

                                {/* <div className="form-group pt-3">
                                    <CustomFormikSelect name="us_city">
                                        <option disabled value="">
                                            City
                                        </option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Hydrabad">
                                            Hydrabad
                                        </option>
                                    </CustomFormikSelect>
                                </div> */}

                                {/* <div className="form-group pt-3">
                                    <CustomFormikSelect name="us_country">
                                        <option disabled value="">
                                            Country
                                        </option>
                                        <option value="India">India</option>
                                        <option value="Japan">Japan</option>
                                    </CustomFormikSelect>
                                </div> */}

                                <div className="form-group">
                                    <CustomFormikField
                                        className="form-control my-3"
                                        placeholder="Address"
                                        name="us_address"
                                        disabled
                                    />
                                </div>

                                {/* <div className="form-group py-3">
                                    <Button
                                        type="submit"
                                        className="btn btn-block login-btn w-100"
                                    >
                                        Save
                                    </Button>
                                </div> */}
                            </FormikForm>
                        </Formik>
                    )}

                    {serviceError && (
                        <CustomToaster
                            bodyContent={serviceError}
                            headerContent={
                                <strong className="me-auto">Error</strong>
                            }
                            onClose={() => setServiceError(undefined)}
                        />
                    )}
                    <AlertModal
                        title="Success"
                        content="User information successfully updated!"
                        onClose={() => {
                            setIsUpadedUserDetails(false);
                            setTimeout(() => {
                                router.push('/');
                            }, 300);
                        }}
                        show={isUpdatedUserDetails}
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
                            <StyledDropzone
                                config={{
                                    maxFiles: 1,
                                    onDrop,
                                }}
                            />
                        </Modal.Body>
                    </Modal>

                    <CustomLoader show={showLoader} />
                </div>
            </div>
        </Layout>
    );
};

export default Profile;

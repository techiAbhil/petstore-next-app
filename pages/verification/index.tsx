import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { RootState } from '../../store/store';
import { otpValidationScehma } from '../../validations/auth.validation';

const Verification = () => {
    const router = useRouter();
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const { us_email, us_phone } = useSelector(
        (state: RootState) => state.registration
    );

    useEffect(() => {
        if (!us_email || !us_phone) return;
    }, [us_email, us_phone]);

    const submitHandler = useCallback(
        async ({ us_otp }: any) => {
            try {
                await axios.patch('/auth/verify', { us_otp, us_email });
                setShowLoader(false);
                router.replace('/login');
            } catch (e: any) {
                setServiceError(e?.message ?? 'Something went wrong!');
                setShowLoader(false);
            }
        },
        [us_email, router]
    );
    return (
        <AuthLayout>
            <>
                <Formik
                    initialValues={{ us_otp: '' }}
                    validationSchema={otpValidationScehma}
                    onSubmit={submitHandler}
                >
                    {() => (
                        <Form className="mt-1">
                            <p className="text-center text-uppercase text-secondary fw-bold">
                                OTP Verification
                            </p>

                            <p className="text-center text-small">
                                OTP has been sent to you on your mobile number $
                                {us_phone}
                            </p>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    name="us_otp"
                                />
                            </div>

                            <div className="forgot-passowrd-container">
                                <div>
                                    <span className="font-small">
                                        Didn’t received otp?
                                    </span>
                                    <a href="#" className="mx-2 font-small">
                                        Resend
                                    </a>
                                </div>
                            </div>

                            <div className="form-group pt-3">
                                <Button
                                    type="submit"
                                    className="btn btn-block login-btn w-100"
                                >
                                    Validate
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
            <CustomLoader show={showLoader} />
            {serviceError && (
                <CustomToaster
                    bodyContent={serviceError}
                    headerContent={<strong className="me-auto">Error</strong>}
                    onClose={() => setServiceError(undefined)}
                />
            )}
        </AuthLayout>
    );
};

export default Verification;

import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { otpValidationScehma } from '../../validations/auth.validation';

const Verification = () => {
    const router = useRouter();
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<any>(undefined);

    useEffect(() => {
        try {
            const RESET_PASSWORD_DETAILS = JSON.parse(
                localStorage.getItem('RESET_PASSWORD_DETAILS') ?? ''
            );
            if (
                !RESET_PASSWORD_DETAILS?.userId ||
                !RESET_PASSWORD_DETAILS?.otp_id
            ) {
                throw new Error('User details could not be found!');
            }
            setUserDetails(RESET_PASSWORD_DETAILS);
        } catch (e) {
            alert('User details cant be found!');
            router.push('/login');
        }
    }, [router]);

    const submitHandler = useCallback(
        async ({ us_otp }: any) => {
            try {
                await axios.post('/auth/verify-password-recovery-otp', {
                    us_otp,
                    userId: userDetails?.userId,
                    otpId: userDetails?.otp_id,
                });
                setShowLoader(false);
                router.replace('/login');
            } catch (e: any) {
                setServiceError(e?.message ?? 'Something went wrong!');
                setShowLoader(false);
            }
        },
        [userDetails?.userId, userDetails?.otp_id, router]
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
                                OTP has been sent to you on your registred email
                                id
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

import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { forgotPassowrdSchema } from '../../validations/auth.validation';

const ForgotPassword = () => {
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const router = useRouter();

    const submitHandler = useCallback(
        async ({ us_email }: any) => {
            if (!us_email) {
                alert('Please enter user email');
                return;
            }
            try {
                const data: any = await axios.get(
                    `/auth/password-recovery-otp?username=${us_email}&mode=email`
                );
                // NOTE: mode = email | mobile according to mode the value can ve phone or email
                if (data?.otp && data?.otp_id) {
                    localStorage.setItem(
                        'RESET_PASSWORD_DETAILS',
                        JSON.stringify({ ...data, otp: '' })
                    );
                    setShowLoader(false);
                    router.push('/forgot-password-otp');
                } else {
                    throw new Error('User details could not be found!');
                }
            } catch (e: any) {
                setServiceError(e?.message ?? 'Something went wrong!');
                setShowLoader(false);
            }
        },
        [router]
    );
    return (
        <AuthLayout>
            <>
                <Formik
                    initialValues={{
                        us_email: '',
                    }}
                    validationSchema={forgotPassowrdSchema}
                    onSubmit={submitHandler}
                >
                    {() => (
                        <Form>
                            <p className="text-center text-uppercase text-secondary fw-bold my-1">
                                Reset Password
                            </p>
                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Enter Registered Email id"
                                    name="us_email"
                                />
                            </div>

                            <div className="form-group pt-3">
                                <Button
                                    type="submit"
                                    className="btn btn-block login-btn w-100"
                                >
                                    Continue
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

export default ForgotPassword;

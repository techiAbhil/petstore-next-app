import axios from 'axios';
import { Formik, Form as FormikForm } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { forgotPasswordFinalSchema } from '../../validations/auth.validation';

const ForgotPassowrdFinal = () => {
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );

    const [serviceSuccess, setServiceSuccess] = useState<string | undefined>(
        undefined
    );
    const router = useRouter();
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
        async ({ us_password }: any) => {
            if (!us_password) return;
            try {
                setShowLoader(true);
                await axios.post('/auth/reset-password', {
                    password: us_password,
                    us_id: userDetails?.userId,
                });
                setShowLoader(false);
                setServiceSuccess('Password successfully changed!');
            } catch (e: any) {
                setServiceError(e?.message ?? 'Something went wrong!');
                setShowLoader(false);
            }
        },
        [userDetails?.userId]
    );
    return (
        <AuthLayout>
            <>
                <Formik
                    initialValues={{
                        us_password: '',
                    }}
                    validationSchema={forgotPasswordFinalSchema}
                    onSubmit={submitHandler}
                >
                    {() => (
                        <FormikForm className="mt-1">
                            <p className="text-center text-uppercase text-secondary fw-bold">
                                Reset Password
                            </p>
                            <p className="text-center text-small">
                                Create your new passowrd here!
                            </p>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control "
                                    placeholder="Password"
                                    name="us_password"
                                    type="password"
                                />
                            </div>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control "
                                    placeholder="Confirm Password"
                                    name="cnf_password"
                                    type="password"
                                />
                            </div>

                            <div className="form-group pt-3">
                                <Button
                                    className="btn btn-block login-btn w-100"
                                    type="submit"
                                    disabled={!!serviceSuccess}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>

                <CustomLoader show={showLoader} />
                {serviceError && (
                    <CustomToaster
                        bodyContent={serviceError}
                        headerContent={
                            <strong className="me-auto">Error</strong>
                        }
                        onClose={() => setServiceError(undefined)}
                    />
                )}

                {serviceSuccess && (
                    <CustomToaster
                        bodyContent={serviceSuccess}
                        headerContent={
                            <strong className="me-auto">Success</strong>
                        }
                        onClose={() => {
                            setServiceSuccess(undefined);
                            localStorage.removeItem('RESET_PASSWORD_DETAILS');
                            router.replace(`/login`);
                        }}
                    />
                )}
            </>
        </AuthLayout>
    );
};

export default ForgotPassowrdFinal;

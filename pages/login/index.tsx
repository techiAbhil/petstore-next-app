import axios from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { setUserState } from '../../store/userSlice';
import { updateUserLocalStorageStateByToken } from '../../utils/helper';
import { loginSchema } from '../../validations/auth.validation';

const Login = () => {
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = useCallback(
        async (values: any) => {
            try {
                console.log(values);
                const {
                    data: { token },
                }: any = await axios.post('/auth/login', values);
                const userDetails = updateUserLocalStorageStateByToken(token);
                dispatch(setUserState(userDetails));
                setShowLoader(false);
                router.replace(userDetails?.us_first_name ? '/' : '/profile');
            } catch (e: any) {
                setServiceError(e?.message ?? 'Something went wrong!');
                setShowLoader(false);
            }
        },
        [dispatch, router]
    );
    return (
        <AuthLayout>
            <>
                <Formik
                    initialValues={{
                        us_email: '',
                        us_password: '',
                        // us_email: 'steve@gmail.com', us_password: 'Test@123'
                    }}
                    validationSchema={loginSchema}
                    onSubmit={submitHandler}
                >
                    {() => (
                        <Form>
                            <p className="text-center text-uppercase text-secondary fw-bold">
                                Login
                            </p>
                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Email"
                                    name="us_email"
                                />
                            </div>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Password"
                                    name="us_password"
                                    type="password"
                                />
                            </div>

                            <div className="forgot-passowrd-container">
                                <div>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="gridCheck"
                                    />
                                    <label className="form-check-label font-small px-1">
                                        Check me out{'  '}
                                    </label>
                                </div>
                                <div>
                                    <a href="#" className="font-small">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <div className="form-group pt-3">
                                <Button
                                    type="submit"
                                    className="btn btn-block login-btn w-100"
                                >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="form-group py-4 row justify-content-between align-middle">
                    <div className="col-3">
                        <div className="ruler" />
                    </div>
                    <div className="col-6">
                        <h6 className="font-small text-uppercase text-center">
                            Or sigin in with
                        </h6>
                    </div>
                    <div className="col-3">
                        <div className="ruler" />
                    </div>
                </div>

                <div className="form-group">
                    <Button className="btn btn-block facebook-btn w-100">
                        <i className="fa-brands fa-facebook-f mx-2"></i>
                        Sign in with Facebook
                    </Button>
                </div>

                <div className="form-group pt-3">
                    <Button className="btn btn-block google-btn w-100">
                        <i className="fa-brands fa-google mx-2"></i>Sign in with
                        Google
                    </Button>
                </div>

                <div className="pt-4 pb-5 row justify-content-center">
                    <p className="font-small text-center m-1">{`Don't have an account?`}</p>
                    <Link className="font-small text-center" href="/register">
                        Sign Up
                    </Link>
                </div>
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

export default Login;

import axios from 'axios';
import { Formik, Form as FormikForm } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import CustomFormikField from '../../components/common/CustomFormikField';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { setRegistrationState } from '../../store/registration-slice';
import { registrationSchema } from '../../validations/auth.validation';

const Register = () => {
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );
    const router = useRouter();
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const dispatch = useDispatch();
    const submitHandler = useCallback(
        async (values: any) => {
            try {
                setShowLoader(true);
                dispatch(setRegistrationState({ ...values }));
                await axios.post('/auth/register', {
                    ...values,
                });
                setShowLoader(false);
                router.push(`/verification`);
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
                        us_phone: '',
                    }}
                    validationSchema={registrationSchema}
                    onSubmit={submitHandler}
                >
                    {() => (
                        <FormikForm className="mt-1">
                            <p className="text-center text-uppercase text-secondary fw-bold">
                                Register
                            </p>

                            <div className="form-group">
                                <Form.Select aria-label="Default select example">
                                    <option>Owner</option>
                                    <option value="1">Shopkeeper</option>
                                    <option value="2">Care Taker</option>
                                    <option value="3">Admin</option>
                                </Form.Select>
                            </div>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Email Id"
                                    name="us_email"
                                />
                            </div>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    name="us_phone"
                                    type="tel"
                                />
                            </div>

                            <div className="form-group my-3">
                                <CustomFormikField
                                    className="form-control "
                                    placeholder="Password"
                                    name="us_password"
                                    type="password"
                                />
                            </div>

                            <div className="form-group pt-3">
                                <Button
                                    className="btn btn-block login-btn w-100"
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
                <div className="form-group py-4 row justify-content-between align-middle">
                    <div className="col-3">
                        <div className="ruler" />
                    </div>
                    <div className="col-6">
                        <h6 className="font-small text-uppercase text-center">
                            Or siginup with
                        </h6>
                    </div>
                    <div className="col-3">
                        <div className="ruler" />
                    </div>
                </div>

                <div className="form-group">
                    <Button className="btn btn-block facebook-btn w-100">
                        <i className="fa-brands fa-facebook-f mx-2"></i>
                        Sign up with Facebook
                    </Button>
                </div>

                <div className="form-group pt-3">
                    <Button className="btn btn-block google-btn w-100">
                        <i className="fa-brands fa-google mx-2"></i>Sign up with
                        Google
                    </Button>
                </div>

                <div className="pt-4 pb-4 row justify-content-center">
                    <p className="font-small text-center m-1">{`Already have an account?`}</p>
                    <Link className="font-small text-center" href="/login">
                        Login Here
                    </Link>
                </div>

                <div className="pb-5 d-flex justify-content-center align-items-center">
                    <a className="font-extra-small px-2" href="#">
                        Terms & Condition
                    </a>
                    <span className="font-grey">{'|'}</span>
                    <a className="font-extra-small px-2" href="#">
                        Privacy Policy
                    </a>
                </div>

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
            </>
        </AuthLayout>
    );
};

export default Register;

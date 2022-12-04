import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AuthLayout from '../../components/layout/auth-layout';

const Register = () => {
    const router = useRouter();
    return (
        <AuthLayout>
            <>
                <form className="mt-1">
                    <p className="text-center text-uppercase text-secondary fw-bold">
                        Register
                    </p>

                    <div className="form-group">
                        <Form.Select aria-label="Default select example">
                            <option>Owner</option>
                            <option value="1">Owner 1</option>
                            <option value="2">Owner 2</option>
                        </Form.Select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Email ID / Mobile Number"
                        />
                    </div>

                    <div className="form-group mt-1">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Password / OTP"
                        />
                    </div>

                    <div className="form-group mt-1">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Re-enter Password / OTP"
                        />
                    </div>

                    <div className="form-group pt-3">
                        <Button
                            className="btn btn-block login-btn w-100"
                            onClick={() => router.push('/register-profile')}
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>

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
                    <a
                        className="font-extra-small px-2"
                        href="javascript:void(0);"
                    >
                        Terms & Condition
                    </a>
                    <span className="font-grey">{'|'}</span>
                    <a
                        className="font-extra-small px-2"
                        href="javascript:void(0);"
                    >
                        Privacy Policy
                    </a>
                </div>
            </>
        </AuthLayout>
    );
};

export default Register;

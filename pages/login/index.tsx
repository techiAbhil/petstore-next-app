import Link from 'next/link';
import { Button } from 'react-bootstrap';
import AuthLayout from '../../components/layout/auth-layout';

const Login = () => {
    return (
        <AuthLayout>
            <>
                <form className="mt-1">
                    <p className="text-center text-uppercase text-secondary fw-bold">
                        Login
                    </p>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Username"
                        />
                    </div>

                    <div className="form-group mt-1">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Password"
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
                        <Button className="btn btn-block login-btn w-100">
                            Login
                        </Button>
                    </div>
                </form>

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
        </AuthLayout>
    );
};

export default Login;

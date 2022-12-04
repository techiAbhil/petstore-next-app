import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import MAIN_LOGO from '../../assets/main-logo.png';
import MenuList from './menu-list';

const Layout = ({ children }: { children: any }) => {
    const [isMobileMenuExpanded, setIsMobileMenuExpanded] =
        useState<boolean>(false);
    const router = useRouter();
    return (
        <div className="container-fluid">
            {/* <!-- for mobile --> */}
            <header className="row sticky-top bg-header-color d-lg-none d-xl-none d-flex">
                <div className="col-6">
                    <Image
                        src={MAIN_LOGO}
                        className="img-fluid rounded"
                        alt="Responsive image"
                        onClick={() => router.push('/')}
                    />
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <a
                        href="#"
                        className="sandwitch-icon mr-2"
                        onClick={() => router.push('/login')}
                    >
                        <i className="fa-solid fa-user"></i>
                    </a>
                    <a
                        className="sandwitch-icon mr-2"
                        data-toggle="collapse"
                        data-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() =>
                            setIsMobileMenuExpanded(!isMobileMenuExpanded)
                        }
                    >
                        <i className="fa-solid fa-bars"></i>
                    </a>
                </div>
                {isMobileMenuExpanded && (
                    <div className="row d-flex justify-content-center bg-header-color">
                        <nav className="navbar navbar-expand-lg">
                            <MenuList />
                        </nav>
                    </div>
                )}
            </header>

            {/* <!-- for desktop --> */}
            <header className="row sticky-top bg-header-color d-none d-md-none d-lg-flex">
                <div
                    className="col-lg-3 d-flex justify-content-center pt-2 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    <Image
                        src={MAIN_LOGO}
                        className="img-fluid rounded"
                        alt="Responsive image"
                    />
                </div>

                <div className="col-lg-6 d-flex justify-content-center">
                    <nav className="navbar navbar-expand-lg">
                        <MenuList />
                    </nav>
                </div>

                <div className="col-lg-3 d-flex justify-content-center">
                    <Stack
                        className="d-flex align-items-center"
                        direction="horizontal"
                        gap={2}
                    >
                        <button
                            type="button"
                            className="btn login-btn"
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </button>
                        <button type="button" className="btn login-btn">
                            Get Started
                        </button>
                    </Stack>
                </div>
            </header>

            {children}
        </div>
    );
};

export default Layout;

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Stack } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import MAIN_LOGO from '../../assets/main-logo.png';
import ProfileDropdown from '../common/ProfileDropdown';
import MenuList from './menu-list';
import SidebarMenuItems from './sidebar-menu';

const expand = false;
function Layout({ children }: { children: any }) {
    const router = useRouter();
    const isAuthenticated = useMemo(() => {
        if (typeof window !== 'undefined')
            return window.localStorage.getItem('AUTH_TOKEN') ? true : false;
        return false;
    }, []);
    return (
        <div className="container-fluid">
            <Navbar
                sticky="top"
                expand={expand}
                className="row bg-header-color"
            >
                {/* for mobile */}
                <div className="d-lg-none d-xl-none row">
                    <div
                        className="col-8 d-flex justify-content-center pt-2 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <Navbar.Brand href="#">
                            <Image
                                src={MAIN_LOGO}
                                className="img-fluid rounded"
                                alt="Responsive image"
                            />
                        </Navbar.Brand>
                    </div>

                    <div className="col-4 d-flex justify-content-center">
                        <Stack
                            className="d-flex align-items-center"
                            direction="horizontal"
                            gap={2}
                        >
                            {!isAuthenticated ? (
                                <a
                                    href="#"
                                    className="profile-login-icon mr-2"
                                    onClick={() => router.push('/login')}
                                >
                                    {/* <i className="fa-solid fa-user"></i> */}
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                </a>
                            ) : (
                                <ProfileDropdown />
                            )}
                            <Navbar.Toggle
                                className="sandwich-icon"
                                aria-controls={`offcanvasNavbar-expand-${expand}`}
                            />
                        </Stack>
                    </div>
                    <SidebarMenuItems />
                </div>
                {/* end of mobile */}

                {/* for desktop */}
                <div className="d-none d-md-none  d-lg-flex row">
                    <div
                        className="col-lg-3 d-flex justify-content-center pt-2 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <Navbar.Brand href="#">
                            <Image
                                src={MAIN_LOGO}
                                className="img-fluid rounded"
                                alt="Responsive image"
                            />
                        </Navbar.Brand>
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
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn login-btn"
                                        onClick={() => router.push('/login')}
                                    >
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        className="btn login-btn"
                                        onClick={() => router.push('/register')}
                                    >
                                        Register
                                    </button>
                                </>
                            ) : (
                                <ProfileDropdown />
                            )}
                            <Navbar.Toggle
                                className="sandwich-icon"
                                aria-controls={`offcanvasNavbar-expand-${expand}`}
                            />
                        </Stack>
                    </div>
                    <SidebarMenuItems />
                </div>
                {/* end of desktop */}
            </Navbar>
            {children}
        </div>
    );
}

export default Layout;

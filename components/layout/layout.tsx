import Image from 'next/image';
import { Stack } from "react-bootstrap";
import MAIN_LOGO from '../../assets/main-logo.png';


const Layout = ({ children }: {
    children: any
}) => {
    return (
        <div className="container-fluid">
            {/* <!-- for mobile --> */}
            <header className="row sticky-top bg-header-color d-none d-lg-none d-xl-none d-flex">
                <div className="col-6">

                    <Image src={MAIN_LOGO} className="img-fluid rounded" alt="Responsive image" />
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <a href="#" className="sandwitch-icon mr-2">
                        <i className="fa-solid fa-user"></i>
                    </a>
                    <a className="sandwitch-icon mr-2" data-toggle="collapse" data-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </a>
                </div>
            </header>

            <div className="collapse" id="navbarToggleExternalContent">
                <div className="row d-flex justify-content-center bg-header-color">

                    <nav className="navbar navbar-expand-lg">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-custom-menu-link">
                            <li className="nav-item">
                                <button className="btn btn-menu-item">For Pet Parent</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">For Pet Business</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">Blog</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">Deal & Promotion</button>
                            </li>

                        </ul>

                    </nav>
                </div>
            </div>


            {/* <!-- for desktop --> */}
            <header className="row sticky-top bg-header-color d-none d-md-none d-lg-flex">

                <div className="col-lg-3 d-flex justify-content-center pt-2">
                    <Image src={MAIN_LOGO} className="img-fluid rounded " alt="Responsive image" />
                </div>

                <div className="col-lg-6 d-flex justify-content-center">

                    <nav className="navbar navbar-expand-lg">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-custom-menu-link">
                            <li className="nav-item">
                                <button className="btn btn-menu-item">For Pet Parent</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">For Pet Business</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">Blog</button>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-menu-item">Deal & Promotion</button>
                            </li>

                        </ul>

                    </nav>
                </div>

                <div className="col-lg-3 d-flex justify-content-center">
                    <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
                        <button type="button" className="btn login-btn">Login</button>
                        <button type="button" className="btn login-btn">Get Started</button>
                    </Stack>
                </div>

            </header>

            {children}

        </div>
    )
}

export default Layout
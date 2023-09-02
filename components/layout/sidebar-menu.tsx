import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import MAIN_LOGO from '../../assets/main-logo.png';
import ProfileDisplay from '../../components/common/ProfileDisplay';

const expand = false;
const SidebarMenuItems = () => {
    const [selectedNestedDropdown, setSelectedNestedDropdown] =
        useState<string>('');

    const router = useRouter();

    return (
        <Navbar.Offcanvas
            className="bg-header-color"
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Image
                        src={MAIN_LOGO}
                        className="img-fluid rounded"
                        alt="Responsive image"
                        width={200}
                        height={200}
                    />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <div className="d-flex justify-content-center mb-3">
                        <ProfileDisplay />
                    </div>
                    <NavDropdown
                        title="My Pet Assistent"
                        className={`offcanvasNavbarDropdown`}
                    >
                        <NavDropdown.Item href="#">Basic Info</NavDropdown.Item>

                        <NavDropdown.Item href="#">
                            <NavDropdown
                                title="History"
                                className={`offcanvasNavbarDropdown`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNestedDropdown(
                                        selectedNestedDropdown === 'History'
                                            ? ''
                                            : 'History'
                                    );
                                }}
                                show={selectedNestedDropdown === 'History'}
                            >
                                <NavDropdown.Item href="#">
                                    Vaccination
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Parasite Prevention
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Grooming
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Measurements
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Episodes & Symptomatic History
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* History */}
                        </NavDropdown.Item>

                        <NavDropdown.Item href="#">Expenses</NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            <NavDropdown
                                title="Daily Activity"
                                className={`offcanvasNavbarDropdown`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedNestedDropdown(
                                        selectedNestedDropdown ===
                                            'Daily Activity'
                                            ? ''
                                            : 'Daily Activity'
                                    );
                                }}
                                show={
                                    selectedNestedDropdown === 'Daily Activity'
                                }
                            >
                                <NavDropdown.Item href="#">
                                    Food
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Walk
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Training
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Pee
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    Poop
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* History */}
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                        title="My Marketplace"
                        className={`offcanvasNavbarDropdown`}
                    >
                        <NavDropdown.Item
                            href="#"
                            onClick={() => router.push('/my-marketplace')}
                        >
                            Products
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            href="#"
                            onClick={() => router.push('/my-marketplace')}
                        >
                            Services
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#">My Pet Family</Nav.Link>
                    <Nav.Link
                        href="#"
                        onClick={() => router.push('/order-history')}
                    >
                        Order History
                    </Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
    );
};

export default SidebarMenuItems;

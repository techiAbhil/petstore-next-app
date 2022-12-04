import Image from 'next/image';
import { useRouter } from 'next/router';
import { Card, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LOGO from '../assets/logo.svg';

import PET_ASSIST from '../assets/pet-assistent.png';
import PET_FAMILY from '../assets/pet-family.png';
import PET_HOME from '../assets/pet-home.png';
import PET_MARKETPLACE from '../assets/pet-marketplace.png';
import Footer from '../components/home/footer';
import Testimonial from '../components/home/testimonial';
import Layout from '../components/layout/layout';

const Index = () => {
    const router = useRouter();
    return (
        <Layout>
            <section className="row bg-header-color">
                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h1 className="fw-bolder">Everything</h1>
                    <h3 className="fw-bolder">Your Pet Needs</h3>
                    <p className="text-center py-3 px-5">
                        Experience the best care for your furry babies with the
                        help of our trusted experts. An all-in-one platform for
                        your pets needs
                    </p>
                    <Stack
                        className="justify-content-center"
                        direction="horizontal"
                        gap={1}
                    >
                        <Button className="btn login-btn">Get Started</Button>
                        <Button className="btn login-btn">Download App</Button>
                    </Stack>
                </div>

                <div className="col-md-6 col-sm-12">
                    <Image
                        src={LOGO}
                        className="img-fluid"
                        alt="Responsive image"
                    />
                </div>
            </section>

            <section className="my-5">
                <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <p className="pt-1 col-sm-12 text-center">
                        Petcare Services
                    </p>
                    <h3 className="fw-bolder col-sm-12 text-center">
                        Direct booking to your favourite pet care
                    </h3>
                    <p className="py-1 col-sm-12 text-center">
                        Book trusted pet care services who’ll treat your pets
                        like family. More
                        <a href="#">Petcare -</a>
                    </p>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn">
                        <Image
                            src={PET_HOME}
                            alt="Dog"
                            className="img-fluid mt-2"
                            height="50"
                            width="50"
                        />
                        <p className="mt-2">Services</p>
                    </div>

                    <div
                        className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn"
                        onClick={() => router.push('my-pet')}
                    >
                        <Image
                            src={PET_ASSIST}
                            alt="Dog"
                            className="img-fluid mt-2"
                            height="50"
                            width="50"
                        />
                        <p className="mt-2">Pet Assistent</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn">
                        <Image
                            src={PET_FAMILY}
                            alt="Dog"
                            className="img-fluid mt-2"
                            height="50"
                            width="50"
                        />
                        <p className="mt-2">Pet Family</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn">
                        <Image
                            src={PET_MARKETPLACE}
                            alt="Dog"
                            className="img-fluid mt-2"
                            height="50"
                            width="50"
                        />
                        <p className="mt-2">Marketplace</p>
                    </div>
                </div>
            </section>

            <section className="row">
                <div className="col-md-6 col-sm-12">
                    <Image
                        src={LOGO}
                        className="img-fluid"
                        alt="Responsive image"
                    />
                </div>

                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="fw-bolder">Why to choose us</h2>
                    {[1, 2, 3].map((variant, index) => (
                        <Card
                            key={index}
                            text={'white'}
                            className="mb-1 home-list-items"
                        >
                            <Card.Header>Reason {index + 1}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Some quick example text to build
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>

            {/* <!-- testimonial starts here --> */}
            <Testimonial />

            <Footer />
        </Layout>
    );
};

export default Index;

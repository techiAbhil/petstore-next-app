import Image from 'next/image';
import { useRouter } from 'next/router';
import { Card, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LOGO from '../assets/logo.png';

import PET_MARKETPLACE from '../assets/MarketPlaceThumbnail.png';
import PET_ASSIST from '../assets/PetAssistantThumbnail.png';
import PET_FAMILY from '../assets/PetOSphereThumbnail.png';
import Footer from '../components/home/footer';
import Testimonial from '../components/home/testimonial';
import Layout from '../components/layout/layout';

const Index = () => {
    const router = useRouter();
    return (
        <Layout>
            <section className="row">
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
                        <Button
                            className="btn login-btn"
                            onClick={() => router.push('/register')}
                        >
                            Register
                        </Button>
                        <Button className="btn login-btn-secondary">
                            Download App
                        </Button>
                    </Stack>
                </div>

                <div className="col-md-6 col-sm-12 p-5">
                    <Image
                        src={LOGO}
                        className="img-fluid"
                        alt="Responsive image"
                    />
                </div>
            </section>

            <section className=" mb-5">
                <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h3 className="fw-bolder col-sm-12 text-center">
                        Direct booking to your favourite pet care
                    </h3>
                </div>

                <div className="row d-flex justify-content-center">
                    <div
                        className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn"
                        onClick={() => router.push('my-pet')}
                    >
                        <Image
                            src={PET_ASSIST}
                            alt="Dog"
                            className="img-fluid mt-2"
                        />
                        <p className="mt-2">My Pet Assistent</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn">
                        <Image
                            src={PET_FAMILY}
                            alt="Dog"
                            className="img-fluid mt-2"
                        />
                        <p className="mt-2">My Pet-O-Sphere</p>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center landing-section-card-btn">
                        <Image
                            src={PET_MARKETPLACE}
                            alt="Dog"
                            className="img-fluid mt-2"
                        />
                        <p className="mt-2">My Marketplace</p>
                    </div>
                </div>
            </section>

            <section className="row">
                <div className="col-md-6 col-sm-12 p-5 d-flex justify-content-center">
                    <Image
                        src={LOGO}
                        className="img-fluid"
                        alt="Responsive image"
                        width={400}
                        height={400}
                    />
                </div>

                <div className="overflow-y-scroll col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="fw-bolder">About PetsNmore</h2>
                    <Card text={'white'} className="mb-1 home-list-items">
                        <Card.Body>
                            <Card.Text className="text-center">
                                It all started as an idea over a cup of coffee,
                                on how we can support the building of a robust
                                ecosystem that helps pet parents to offer
                                comfortable lives to their pets – who
                                inadvertently are a part of the family now.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <h2 className="fw-bolder mt-3">
                        Description of our services
                    </h2>
                    <Card text={'white'} className="mb-1 home-list-items">
                        <Card.Body>
                            <Card.Text className="text-center">
                                Caring for our pets in our opinion is a
                                multi-people job -. They need all the attention
                                we can offer to receive their unconditional
                                love. To reduce any anxiety or uncertainties
                                that you as a pet parent face and want to offer
                                the best of everything to your pets, we are
                                offering a tech-driven comprehensive pet care
                                solution.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </section>

            {/* <!-- testimonial starts here --> */}
            <Testimonial />

            <Footer />
        </Layout>
    );
};

export default Index;

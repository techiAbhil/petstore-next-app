import Image from 'next/image'
import { Stack } from 'react-bootstrap'
import FOOTER_IMG1 from '../../assets/footer-img-1.png'
import PAYMENT from '../../assets/payment.png'

const Footer = () => {
    return (
        <Stack
            direction="horizontal"
            className="row footer px-2 pb-2 d-flex justify-content-center"
        >
            <div className="col-lg-3 col-md-12 d-flex flex-column justify-content-center align-items-center">
                <h3 className="fw-bolder text-black">Petstore</h3>
                <p className="text-center text-black">
                    Petotum is the first pet ecosystem integrator in Southeast
                    Asia. We provide a integrated system for pet owners, lovers,
                    businesses.
                </p>

                <Image
                    src={FOOTER_IMG1}
                    alt="Dog"
                    className="img-fluid mt-2 pl-4"
                />
                <Image
                    src={PAYMENT}
                    alt="Dog"
                    className="img-fluid mt-2 pl-4"
                />
            </div>
            <div className="col-6 col-lg-2 d-flex flex-column align-items-center">
                <p className="text-bold ">The Company</p>
                <div className="footer-links d-flex flex-column align-items-center">
                    <a href="#">
                        Our Story <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">Careers </a>
                    <a href="#">Test #2 </a>
                    <a href="#">
                        Bookmark <i className="fa-solid fa-bookmark"></i>
                    </a>
                    <a href="#">
                        Pockery <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">Test #3 </a>
                </div>
            </div>
            <div className="col-6 col-lg-2 d-flex flex-column align-items-center">
                <p className="text-bold ">For Business</p>
                <div className="footer-links d-flex flex-column align-items-center">
                    <a href="#">
                        Our Story <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">Careers </a>
                    <a href="#">Test #2 </a>
                    <a href="#">
                        Bookmark <i className="fa-solid fa-hippo"></i>
                    </a>
                    <a href="#">
                        Pockery <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">
                        Test #3 <i className="fa-duotone fa-bat"></i>
                    </a>
                </div>
            </div>
            <div className="col-6 col-lg-2 d-flex flex-column align-items-center">
                <p className="text-bold ">Support</p>
                <div className="footer-links d-flex flex-column align-items-center">
                    <a href="#">
                        Our Story <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">
                        Careers <i className="fa-solid fa-gift"></i>
                    </a>
                    <a href="#">Test #2 </a>
                    <a href="#">
                        Bookmark <i className="fa-solid fa-cat-space"></i>
                    </a>
                    <a href="#">
                        Pockery <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">Test #3 </a>
                </div>
            </div>
            <div className="col-6 col-lg-2 d-flex flex-column align-items-center">
                <p className="text-bold ">For Pet Parters</p>
                <div className="footer-links d-flex flex-column align-items-center">
                    <a href="#">
                        Our Story <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">Careers </a>
                    <a href="#">Test #2 </a>
                    <a href="#">Bookmark </a>
                    <a href="#">
                        Pockery <i className="fa-solid fa-book"></i>
                    </a>
                    <a href="#">
                        Test #3 <i className="fa-solid fa-alicorn"></i>
                    </a>
                </div>
            </div>

            <div className="col-12 col-lg-10 row d-flex align-items-center justify-content-around copyright-div">
                <div className="col-12 col-lg-6 d-flex justify-content-center">
                    <p className="copyright-txt">
                        Copyright © <a href="">Test organizaion</a> loreum ipsum{' '}
                        <a>Terms & Privacy Policy</a>
                    </p>
                </div>

                <div className="col-12 col-lg-4 social-media-icons d-flex justify-content-center">
                    <i className=" fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-square-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-square-facebook"></i>
                </div>
                <Stack className="col-12 col-lg-2 d-flex justify-content-end">
                    <button type="button" className="btn login-btn btn-block">
                        Chat Support
                    </button>
                </Stack>
            </div>
        </Stack>
    )
}

export default Footer

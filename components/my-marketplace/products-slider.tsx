import Image from 'next/image';
import { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import Products_Slider_image from '../../assets/products-slider.png';

import { Stack } from 'react-bootstrap';
import 'react-slideshow-image/dist/styles.css';

type PRODUCTS_SLIDER_TYPE = {
    productPic: any;

    productTitle: string;
};

const productsSliderItems: PRODUCTS_SLIDER_TYPE[] = [
    {
        productPic: Products_Slider_image,
        productTitle: `Petsy Naturally Irresistible Dog Treats - Combo Pack (3 Flavours)`,
    },
    {
        productPic: Products_Slider_image,
        productTitle: `Petsy Naturally Irresistible Dog Treats - Combo Pack (3 Flavours)`,
    },
    {
        productPic: Products_Slider_image,
        productTitle: `Petsy Naturally Irresistible Dog Treats - Combo Pack (3 Flavours)`,
    },
];

const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
    },
];

const ProductsSliderComponent = () => {
    return (
        <Fragment>
            <section className="row mt-5 py-10 sm:py-5 mb-5 sm:mb-2 testimonial-section-container">
                <Slide
                    autoplay={true}
                    responsive={responsiveSettings}
                    duration={2500}
                >
                    {productsSliderItems.map(
                        ({ productTitle, productPic }, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex flex-column testimonial-card p-5"
                                >
                                    <Stack
                                        direction="horizontal"
                                        className="pl-2 center"
                                    >
                                        <Image
                                            src={productPic}
                                            className="img-fluid"
                                            alt="Product Description"
                                            height={180}
                                        />
                                    </Stack>
                                    <div className="center pt-3">
                                        <span className="center text-center">
                                            {productTitle}
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </Slide>
            </section>
        </Fragment>
    );
};

export default ProductsSliderComponent;

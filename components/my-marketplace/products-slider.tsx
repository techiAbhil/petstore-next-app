import Image from 'next/image';
import { Fragment, useMemo } from 'react';
import { Slide } from 'react-slideshow-image';
import Products_Slider_image from '../../assets/products-slider.png';

import { Stack } from 'react-bootstrap';
import 'react-slideshow-image/dist/styles.css';
import { IProducts } from '../../store/my-marketplace-Slice';

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
            slidesToShow: 3,
            slidesToScroll: 3,
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

const ProductsSliderComponent = ({
    comboProducts = [],
}: {
    comboProducts: IProducts[];
}) => {
    const sliderConfig = useMemo(() => {
        if (comboProducts.length <= 2) {
            const updatedSliderSettings = responsiveSettings.map((s) => {
                return {
                    ...s,
                    settings: {
                        slidesToShow: comboProducts.length,
                        slidesToScroll: comboProducts.length,
                    },
                };
            });
            return updatedSliderSettings;
        } else {
            responsiveSettings;
        }
    }, [comboProducts.length]);
    return (
        <Fragment>
            <section className="row mt-5 py-10 sm:py-5 mb-5 sm:mb-2 testimonial-section-container">
                <Slide
                    // autoplay={true}
                    responsive={sliderConfig}
                    duration={2500}
                >
                    {comboProducts.map(
                        ({ pr_poster_path, pr_name }, index: number) => {
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
                                            src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                                            className="img-fluid"
                                            alt="Combo products"
                                            height={180}
                                            width={180}
                                        />
                                    </Stack>
                                    <div className="center pt-3">
                                        <span className="center text-center">
                                            {pr_name}
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

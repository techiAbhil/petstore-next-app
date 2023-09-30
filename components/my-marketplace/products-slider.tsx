import { Fragment, useMemo } from 'react';
import { Slide } from 'react-slideshow-image';
import Products_Slider_image from '../../assets/products-slider.png';

import { useRouter } from 'next/router';
import { Button, Stack } from 'react-bootstrap';
import 'react-slideshow-image/dist/styles.css';
import ERROR_IMG from '../../assets/no-image.jpg';
import { IProducts } from '../../store/my-marketplace-slice';
import MyImage from '../common/MyImage';
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
    const router = useRouter();
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
            <div className="row">
                <p className="text-center text-secondary">
                    PRODUCTS COMBO OFFERS
                </p>
            </div>
            <section className="row">
                <Slide
                    autoplay={false}
                    responsive={sliderConfig}
                    duration={2500}
                    arrows={false}
                    indicators={true}
                >
                    {comboProducts.map(
                        ({ pr_poster_path, pr_name, pr_id }, index: number) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-8">
                                        <Stack
                                            direction="horizontal"
                                            className="pl-2 center"
                                        >
                                            <MyImage
                                                src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                                                className="img-fluid"
                                                alt="Combo products"
                                                height={300}
                                                width={500}
                                                defaultImage={ERROR_IMG}
                                            />
                                        </Stack>
                                    </div>
                                    <div className="col-4 d-flex flex-column justify-content-center">
                                        <h4 className="my-5 col-sm-12 text-center text-uppercase text-secondary text-bold">
                                            {pr_name}
                                        </h4>
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                type="submit"
                                                className="orange-btn btn-block mx-2"
                                                onClick={() =>
                                                    router.push(
                                                        `/product-details/${pr_id}`
                                                    )
                                                }
                                            >
                                                Shop Now
                                            </Button>
                                        </div>
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

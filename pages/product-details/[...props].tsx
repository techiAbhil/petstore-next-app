import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import NoImage from '../../assets/no-image.jpg';
import CustomLoader from '../../components/common/CustomLoader';
import MyImage from '../../components/common/MyImage';
import CommonMenuSlider from '../../components/common/common-menu-slider';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import { addCartItems } from '../../store/cart-items-slice';
import { IProducts } from '../../store/my-marketplace-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { API_ERROR_MSG } from '../../utils/constants';

interface IProductImages {
    pi_id: string;
    pr_id: string;
    pi_path: string;
    display_order: number;
}

const sliderConfig = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
        },
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
        },
    },
];

const ProductDetails = () => {
    const router = useRouter();
    const props = router.query.props;
    const [pr_id]: any = props ?? [''];
    const [productDetails, setProductDetails] = useState<IProducts>();
    const [productImages, setProductImages] = useState<IProductImages[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const disptach = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isLoading: cartLoading } = useAppSelector((state) => state.cart);

    const getProductDetails = useCallback(async () => {
        try {
            if (!pr_id) return;
            const data: any = await axios.get(`marketplace/product/${pr_id}`);
            const productImages: any = await axios.get(
                `marketplace/product/${pr_id}/images`
            );
            if (data?.status === true) {
                setProductDetails(data?.productDatails ?? undefined);
                setProductImages(productImages?.images ?? []);
                setIsLoading(false);

                return;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            setIsLoading(false);
            setProductDetails(undefined);
            console.log('error while getting products = ', e);
        }
    }, [pr_id]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    const discountedProductPrice = useMemo(() => {
        const productActualPrice = productDetails?.pr_price;
        if (!productActualPrice || productActualPrice < 0) return 0;
        const discountAmount =
            (productActualPrice * (productDetails?.pr_discount ?? 0)) / 100;
        return productActualPrice - discountAmount;
    }, [productDetails?.pr_discount, productDetails?.pr_price]);

    const addCartItemHandler = useCallback(() => {
        try {
            if (!productDetails?.pr_id) return;
            disptach(
                addCartItems({
                    pr_id: +productDetails.pr_id,
                    ct_price: discountedProductPrice,
                    ct_qty: 1,
                })
            );
            router.push('/cart');
        } catch (e) {
            alert('Something went wrong! could not add item to cart!');
        }
    }, [discountedProductPrice, disptach, productDetails?.pr_id, router]);

    useEffect(() => {
        setSelectedImage(productImages?.[0]?.pi_path ?? '');
    }, [productImages]);

    return (
        <Layout>
            <section className="my-5 container">
                {!isLoading && !productDetails && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {'Can not fetch product details!'}
                        </h2>
                    </div>
                )}

                {!isLoading && productDetails && (
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <div className="mt-1 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <p className="pb-2 col-sm-12 text-center text-uppercase">
                                Product Details
                            </p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <div className="d-flex justify-content-center align-items-center">
                                    <MyImage
                                        src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${selectedImage}`}
                                        alt="best selling dog food"
                                        width={400}
                                        height={400}
                                        defaultImage={NoImage}
                                    />
                                </div>
                                <CommonMenuSlider
                                    totalItems={productImages.length}
                                    customSliderConfig={sliderConfig}
                                    infinite={true}
                                >
                                    {productImages.map(
                                        ({ pi_path }, index: number) => {
                                            return (
                                                <div
                                                    key={`activity-menu-items-${index}`}
                                                    role="button"
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            pi_path ?? ''
                                                        )
                                                    }
                                                >
                                                    <div className="form-group d-flex justify-content-center">
                                                        <MyImage
                                                            src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pi_path}`}
                                                            alt="best selling dog food"
                                                            height={50}
                                                            width={50}
                                                            defaultImage={
                                                                NoImage
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </CommonMenuSlider>
                            </div>

                            <div className="col-12 col-md-6 ">
                                <h3 className="my-5 col-sm-12 text-center text-uppercase text-secondary text-bold">
                                    {productDetails?.pr_name}
                                </h3>

                                <p className="text-secondary text-center px-20 mt-1">
                                    {productDetails?.pr_description}
                                </p>
                                <div className="my-5 row align-items-center justify-align-content-between section-text-style">
                                    <div className="col-4">
                                        <p className="text-center text-bold px-20 mt-1">
                                            ₹{discountedProductPrice}
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p className="text-center text-line-through px-20 mt-1">
                                            ₹{productDetails?.pr_price}
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p className="text-center px-20 mt-1">
                                            {productDetails?.pr_discount}%Off
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <Button
                                        type="submit"
                                        className="btn btn-block login-btn mx-2"
                                        onClick={addCartItemHandler}
                                    >
                                        <i className={`fa-solid fa-plus`}></i>{' '}
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <CustomLoader show={isLoading || cartLoading} />
            </section>
            <Footer />
        </Layout>
    );
};

export default ProductDetails;

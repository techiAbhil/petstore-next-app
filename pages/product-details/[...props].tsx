import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import CustomLoader from '../../components/common/CustomLoader';
import CommonMenuSlider from '../../components/common/common-menu-slider';
import Layout from '../../components/layout/layout';
import { IProducts } from '../../store/my-marketplace-slice';
import { API_ERROR_MSG } from '../../utils/constants';

interface IProductImages {
    pi_id: string;
    pr_id: string;
    pi_path: string;
    display_order: number;
}

const ProductDetails = () => {
    const router = useRouter();
    const props = router.query.props;
    const [pr_id]: any = props ?? [''];
    const [productDetails, setProductDetails] = useState<IProducts>();
    const [productImages, setProductImages] = useState<IProductImages[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    return (
        <Layout>
            <section className="mt-1 mb-1 container">
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
                            <h5 className="pt-1 col-sm-12 text-center text-bold text-uppercase">
                                Product Details
                            </h5>
                        </div>
                        <CommonMenuSlider totalItems={productImages.length}>
                            {productImages.map(
                                ({ pi_path, pi_id }, index: number) => {
                                    return (
                                        <div
                                            key={`activity-menu-items-${index}`}
                                            className="mt-2 mx-3 col-md-4 col-12 justify-content-center align-items-center"
                                        >
                                            <div className="form-group d-flex justify-content-center">
                                                <div className="d-flex justify-content-center align-items-center p-4 products">
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pi_path}`}
                                                        alt="best selling dog food"
                                                        height={100}
                                                        width={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </CommonMenuSlider>

                        <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <h5 className="pt-1 col-sm-12 text-center text-uppercase">
                                {productDetails?.pr_name}
                            </h5>
                        </div>

                        <div className="mt-2 row align-items-center justify-align-content-between section-text-style">
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

                        <div className="mt-1 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <p className="text-secondary text-center px-20 mt-1">
                                {productDetails?.pr_description}
                            </p>
                        </div>

                        <div className="mt-1 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <p className="text-secondary text-center px-20 mt-1">
                                <div className="form-group py-3">
                                    <Button
                                        type="submit"
                                        className="btn btn-block login-btn mx-2"
                                    >
                                        <i className={`fa-solid fa-plus`}></i>{' '}
                                        Add to Cart
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="btn btn-block login-btn mx-2"
                                    >
                                        <i className="fa-solid fa-code-compare"></i>{' '}
                                        Compare
                                    </Button>
                                </div>
                            </p>
                        </div>
                    </div>
                )}
                <CustomLoader show={isLoading} />
            </section>
        </Layout>
    );
};

export default ProductDetails;

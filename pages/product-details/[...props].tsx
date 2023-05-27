import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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

    return (
        <Layout>
            <section className="mt-3 mb-5 container">
                {!isLoading && !productDetails && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {'Can not fetch product details!'}
                        </h2>
                    </div>
                )}

                {!isLoading && productDetails && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
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
                    </div>
                )}
                <CustomLoader show={isLoading} />
            </section>
        </Layout>
    );
};

export default ProductDetails;

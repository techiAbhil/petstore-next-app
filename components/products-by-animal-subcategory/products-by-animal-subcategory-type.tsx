import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { IProducts } from '../../store/my-marketplace-slice';
import { API_ERROR_MSG } from '../../utils/constants';
import CommonMenuSlider from '../common/common-menu-slider';

const ProductsByAnimalSubcategoryType = ({
    selectedTab,
}: {
    selectedTab: number | undefined;
}) => {
    const [products, setProducts] = useState<IProducts[]>();
    const router = useRouter();

    const loadData = useCallback(async () => {
        try {
            if (!selectedTab) return;
            const data: any = await axios.get(
                `marketplace/product_subcategory/${selectedTab}/products`
            );
            if (data?.status === true) {
                setProducts(data?.products ?? []);
                return;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            setProducts(undefined);
            console.log('error while getting products = ', e);
        }
    }, [selectedTab]);
    useEffect(() => {
        loadData();
    }, [loadData]);

    if (!selectedTab) return <></>;
    return products === undefined ? (
        <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
            <h2 className="pt-1 col-sm-12 text-center">
                No Products found for selected category!
            </h2>
        </div>
    ) : (
        <>
            <React.Fragment>
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        {products[0]?.psc_title}
                    </h2>
                </div>
                <div className="d-flex row justify-content-center align-items-center mt-4">
                    <CommonMenuSlider totalItems={products?.length}>
                        {products?.map(
                            ({ pr_poster_path, pr_name, pr_id }, index) => {
                                return (
                                    <div
                                        key={`activity-menu-items-${index}`}
                                        className="mt-2 mx-3 col-md-4 col-12 justify-content-center align-items-center"
                                    >
                                        <div
                                            className="form-group d-flex justify-content-center"
                                            role="button"
                                            onClick={() =>
                                                router.push(
                                                    `/product-details/${pr_id}`
                                                )
                                            }
                                        >
                                            <div className="d-flex justify-content-center align-items-center p-4 products">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                                                    alt="best selling dog food"
                                                    height={100}
                                                    width={100}
                                                />
                                            </div>
                                        </div>
                                        <p className="mt-2 text-center text-wrap">
                                            {pr_name}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </CommonMenuSlider>
                </div>
            </React.Fragment>
        </>
    );
};

export default ProductsByAnimalSubcategoryType;

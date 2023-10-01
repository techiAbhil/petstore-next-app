import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { IProducts } from '../../store/my-marketplace-slice';
import { API_ERROR_MSG } from '../../utils/constants';
import ProductCardItem from '../product-card-item';

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
                    {products?.map(
                        (
                            { pr_poster_path, pr_name, pr_id }: any,
                            index: number
                        ) => {
                            return (
                                <div
                                    className="col-6 col-md-2 d-flex flex-column justify-content-center mx-4"
                                    key={`activity-menu-items-${index}`}
                                >
                                    <ProductCardItem
                                        pr_poster_path={pr_poster_path}
                                        pr_id={pr_id}
                                        pr_name={pr_name}
                                    />
                                </div>
                            );
                        }
                    )}
                </div>
            </React.Fragment>
        </>
    );
};

export default ProductsByAnimalSubcategoryType;

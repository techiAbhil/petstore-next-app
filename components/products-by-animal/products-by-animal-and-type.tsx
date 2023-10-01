import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IProducts } from '../../store/my-marketplace-slice';
import { API_ERROR_MSG } from '../../utils/constants';
import ProductCardItem from '../product-card-item';

const ProductsByAnimalAndType = ({
    selectedTab,
}: {
    selectedTab: number | undefined;
}) => {
    const [products, setProducts] = useState<Record<string, IProducts[]>>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const loadData = useCallback(async () => {
        try {
            if (!selectedTab) return;
            const data: any = await axios.get(
                `marketplace/product_category/${selectedTab}/products`
            );
            if (data?.status === true) {
                const grouped = _.groupBy(
                    data.products,
                    (product) => product?.psc_title
                );
                console.log('grouped = ', grouped);
                setProducts(grouped ?? []);
                return;
            }

            throw new Error(API_ERROR_MSG);
        } catch (e) {
            setProducts(undefined);
            console.log('error while getting products = ', e);
        } finally {
            setIsLoading(false);
        }
    }, [selectedTab]);
    useEffect(() => {
        setIsLoading(true);
        loadData();
    }, [loadData]);

    if (selectedTab && !isLoading) {
        return products === undefined ? (
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center">
                    No Products found for selected category!
                </h2>
            </div>
        ) : (
            <>
                {Object.keys(products).map((groupName) => {
                    return (
                        <React.Fragment key={groupName}>
                            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                                    {groupName}
                                </h2>
                            </div>
                            <div className="d-flex row justify-content-center align-items-center mt-1">
                                {products[groupName]?.map(
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
                                                    pr_poster_path={
                                                        pr_poster_path
                                                    }
                                                    pr_id={pr_id}
                                                    pr_name={pr_name}
                                                />
                                            </div>
                                        );
                                    }
                                )}

                                <div className="mt-2 row justify-content-center align-items-center">
                                    <Button
                                        variant="link"
                                        className="text-center text-secondary"
                                        onClick={() =>
                                            router.push(
                                                `/products-by-animal-subcategory/${products?.[groupName]?.[0]?.psc_id}`
                                            )
                                        }
                                    >
                                        See All
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </>
        );
    } else {
        return <></>;
    }
};

export default ProductsByAnimalAndType;

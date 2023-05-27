import axios from 'axios';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { IProducts } from '../../store/my-marketplace-Slice';
import { API_ERROR_MSG } from '../../utils/constants';

const ProductsByAnimalAndType = ({
    selectedTab,
}: {
    selectedTab: number | undefined;
}) => {
    const [products, setProducts] = useState<Record<string, IProducts[]>>();

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
        }
    }, [selectedTab]);
    useEffect(() => {
        loadData();
    }, [loadData]);

    console.log('test = ', Object.keys(products ?? {}));

    if (!selectedTab) return <></>;
    return products === undefined ? (
        <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
            <h2 className="pt-1 col-sm-12 text-center">
                No Products found for selected category!
            </h2>
        </div>
    ) : (
        Object.keys(products).map((groupName) => {
            return (
                <React.Fragment key={groupName}>
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {groupName}
                        </h2>
                    </div>
                    <div className="d-flex row justify-content-center align-items-center mt-4">
                        {products[groupName]?.map(
                            ({ pr_poster_path, pr_name }, index) => {
                                return (
                                    <div
                                        key={`activity-menu-items-${index}`}
                                        className="mt-2 mx-3 col-md-4 col-12 justify-content-center align-items-center"
                                    >
                                        <div className="form-group d-flex justify-content-center">
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
                        <div className="mt-2 row justify-content-center align-items-center">
                            <Link
                                className=" text-center text-secondary"
                                href="/"
                            >
                                See All
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            );
        })
    );
};

export default ProductsByAnimalAndType;

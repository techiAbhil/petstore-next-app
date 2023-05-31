import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsByAnimalSubcategoryType from '../../components/products-by-animal-subcategory/products-by-animal-subcategory-type';
import { useAppDispatch } from '../../store/store';
import { API_ERROR_MSG } from '../../utils/constants';

const ProductsByAnimalSubcategory = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [parentCategory]: any = routePorps ?? ['', ''];
    const [selectedTab, setSelectedTab] = useState<number>();
    const onTabClick = (selectedTab: number) => {
        setSelectedTab(selectedTab);
    };

    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subCategories, setsubCategories] = useState<any[]>([]);

    const loadData = useCallback(async () => {
        try {
            if (!parentCategory) return;
            const data: any = await axios.get(
                `marketplace/product_category/${parentCategory}/subcategory`
            );

            const { subcategories } = data;
            if (data?.status === true && subcategories) {
                setsubCategories(subcategories ?? []);
                setSelectedTab(subcategories?.[0]?.psc_id);
                setIsLoading(false);
                return;
            }
            throw new Error(API_ERROR_MSG);
        } catch (e) {
            setIsLoading(false);
            console.log('error while getting products = ', e);
        }
    }, [parentCategory]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <Layout>
            <Head>
                <title>{parentCategory}</title>
            </Head>
            <section className="mt-3 mb-5 container">
                {!isLoading && subCategories?.length === 0 && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {'Can not fetch sub catogeries!'}
                        </h2>
                    </div>
                )}
                {subCategories?.length > 0 && (
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <div className="center">
                            <div
                                className="btn-group btn-group-toggle"
                                data-toggle="buttons"
                            >
                                {subCategories.map((cat) => {
                                    return (
                                        <button
                                            key={cat.id}
                                            className={`btn btn-secondary ${
                                                selectedTab === cat?.psc_id
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                onTabClick(cat?.psc_id)
                                            }
                                        >
                                            {cat?.psc_title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <ProductsByAnimalSubcategoryType selectedTab={selectedTab} />
                <CustomLoader show={isLoading} />
            </section>
            <Footer />
        </Layout>
    );
};

export default ProductsByAnimalSubcategory;

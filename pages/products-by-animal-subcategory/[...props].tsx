import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsByAnimalSubcategoryType from '../../components/products-by-animal-subcategory/products-by-animal-subcategory-type';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ProductsByAnimalSubcategory = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [parentCategory]: any = routePorps ?? ['', ''];
    const [selectedTab, setSelectedTab] = useState<number>();
    const onTabClick = (selectedTab: number) => {
        setSelectedTab(selectedTab);
    };

    const dispatch = useAppDispatch();

    const { error, isError, isLoading } = useAppSelector(
        (state) => state.productCategoriesByPet
    );

    const subCategories = [
        {
            title: 'Wet',
            id: 1,
        },
        {
            title: 'Dry',
            id: 2,
        },
        {
            title: 'VEGETARIAN FOOD & TREATS',
            id: 3,
        },
    ];

    return (
        <Layout>
            <Head>
                <title>{parentCategory}</title>
            </Head>
            <section className="mt-3 mb-5 container">
                {!isLoading && isError && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {typeof error === 'string'
                                ? error
                                : 'Can not fetch pet catogeries!'}
                        </h2>
                    </div>
                )}
                {subCategories?.length > 0 ? (
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
                                                selectedTab === cat.id
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => onTabClick(cat.id)}
                                        >
                                            {cat.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center">
                            No Categories found for selected animal!
                        </h2>
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

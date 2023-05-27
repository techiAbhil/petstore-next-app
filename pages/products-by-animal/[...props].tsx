import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsByAnimalAndType from '../../components/products-by-animal/products-by-animal-and-type';
import { getProductCategoriesByPetID } from '../../store/product-categories-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ProductsByAnimal = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [pc_title, pc_id]: any = routePorps ?? ['', ''];
    const [selectedTab, setSelectedTab] = useState<number>();
    const onTabClick = (selectedTab: number) => {
        setSelectedTab(selectedTab);
    };

    const dispatch = useAppDispatch();

    const { error, isError, isLoading, categories } = useAppSelector(
        (state) => state.productCategoriesByPet
    );

    useEffect(() => {
        dispatch(getProductCategoriesByPetID(pc_id));
    }, [dispatch, pc_id]);

    useEffect(() => {
        setSelectedTab(categories?.[0]?.prc_id);
    }, [categories]);

    return (
        <Layout>
            <Head>
                <title>{pc_title}</title>
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
                {categories?.length > 0 ? (
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <div className="center">
                            <div
                                className="btn-group btn-group-toggle"
                                data-toggle="buttons"
                            >
                                {categories.map((cat) => {
                                    return (
                                        <button
                                            key={cat.prc_id}
                                            className={`btn btn-secondary ${
                                                selectedTab === cat.prc_id
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                onTabClick(cat.prc_id)
                                            }
                                        >
                                            {cat.prc_title}
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
                <ProductsByAnimalAndType selectedTab={selectedTab} />
                <CustomLoader show={isLoading} />
            </section>
            <Footer />
        </Layout>
    );
};

export default ProductsByAnimal;

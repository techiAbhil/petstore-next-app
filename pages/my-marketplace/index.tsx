import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsTab from '../../components/my-marketplace/products-tab';
import ServicesTab from '../../components/my-marketplace/services-tab';
import { getMyMarketplaceData } from '../../store/my-marketplace-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

enum ITabs {
    Products,
    Services,
}
const MyMarketplace = () => {
    const [selectedTab, setSelectedTab] = useState<ITabs>(ITabs.Products);
    const onTabClick = (selectedTab: ITabs) => {
        setSelectedTab(selectedTab);
    };
    const router = useRouter();
    const { tab } = router.query;
    const dispatch = useAppDispatch();
    const { isLoading, isError, error } = useAppSelector(
        (store) => store.myMarketplace
    );

    useEffect(() => {
        dispatch(getMyMarketplaceData(undefined));
    }, [dispatch]);

    return (
        <Layout>
            <section className="mt-3 mb-5 container">
                {/* basic info */}
                {/* history section */}
                <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <div className="center">
                        <div
                            className="btn-group btn-group-toggle"
                            data-toggle="buttons"
                        >
                            <button
                                className={`btn btn-secondary ${
                                    selectedTab === ITabs.Products
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => onTabClick(ITabs.Products)}
                            >
                                Products
                            </button>
                            <button
                                className={`btn btn-secondary ${
                                    selectedTab === ITabs.Services
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => onTabClick(ITabs.Services)}
                            >
                                Services
                            </button>
                        </div>
                    </div>
                </div>
                {/* // end of tabs */}
                {!isLoading && !isError && (
                    <>
                        {selectedTab === ITabs.Products ? (
                            <ProductsTab />
                        ) : (
                            <ServicesTab />
                        )}
                    </>
                )}
                {!isLoading && isError && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {typeof error === 'string'
                                ? error
                                : 'Can not fetch marketplace data!'}
                        </h2>
                    </div>
                )}
                <CustomLoader show={isLoading} />
            </section>
            <Footer />
        </Layout>
    );
};

export default MyMarketplace;

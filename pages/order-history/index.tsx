import { useState } from 'react';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsOrderHistory from '../../components/order-history/products-order-history';
import ServicesOrderHistory from '../../components/order-history/services-order-history';

enum ITabs {
    Products,
    Services,
}
const OrderHistory = () => {
    const [selectedTab, setSelectedTab] = useState<ITabs>(ITabs.Products);
    const onTabClick = (selectedTab: ITabs) => {
        setSelectedTab(selectedTab);
    };

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

                {selectedTab === ITabs.Products ? (
                    <ProductsOrderHistory />
                ) : (
                    <ServicesOrderHistory />
                )}
            </section>
            <Footer />
        </Layout>
    );
};

export default OrderHistory;

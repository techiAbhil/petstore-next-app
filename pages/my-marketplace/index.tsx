import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import ProductsTab from '../../components/my-marketplace/products-tab';
import ServicesTab from '../../components/my-marketplace/services-tab';

type IMenuItem = {
    iconName: string;
    itemName: string;
};

const productsMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-dog',
        itemName: 'Dogs',
    },
    {
        iconName: 'fa-solid fa-cat',
        itemName: 'Cats',
    },
    {
        iconName: 'fa-solid fa-fish',
        itemName: 'Fish',
    },
    {
        iconName: 'fa-solid fa-kiwi-bird',
        itemName: 'Birds',
    },
];

const featuredProducts: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-burger',
        itemName: 'Drools Chicken & Egg Puppy Dry Dog Food',
    },
    {
        iconName: 'fa-solid fa-shoe-prints',
        itemName: 'Drools Chicken & Egg Puppy Dry Dog Food',
    },
    {
        iconName: 'fa-solid fa-dumbbell',
        itemName: 'Drools Chicken & Egg Puppy Dry Dog Food',
    },
    {
        iconName: 'fa-solid fa-hands-bubbles',
        itemName: 'Drools Chicken & Egg Puppy Dry Dog Food',
    },
    {
        iconName: 'fa-solid fa-toilet',
        itemName: 'Drools Chicken & Egg Puppy Dry Dog Food',
    },
];

const bestSellingProducts: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-wallet',
        itemName: 'Pediagree Combo Meal Pack',
    },
    {
        iconName: 'fa-solid fa-money-bill-transfer',
        itemName: 'Pediagree Combo Meal Pack',
    },
    {
        iconName: 'fa-solid fa-wallet',
        itemName: 'Pediagree Combo Meal Pack',
    },
    {
        iconName: 'fa-solid fa-money-bill-transfer',
        itemName: 'Pediagree Combo Meal Pack',
    },
];

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
                    <ProductsTab />
                ) : (
                    <ServicesTab />
                )}
            </section>
            <Footer />
        </Layout>
    );
};

export default MyMarketplace;

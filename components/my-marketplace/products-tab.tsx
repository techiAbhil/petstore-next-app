import Image from 'next/image';
import DogProfileImg from '../../assets/dog-profile-img.png';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import DogFood from '../../assets/Pedigree.png';
import DogFood1 from '../../assets/dogs-food-2.png';
import ProductsBanner from '../../assets/products-banner.png';
import ProductsSliderComponent from './products-slider';

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
const ProductsTab = () => {
    return (
        <>
            <div className="row justify-content-center mt-4">
                {productsMenuItems.map(({ iconName, itemName }, index) => {
                    return (
                        <div
                            key={`history-menu-item-${index}`}
                            className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                        >
                            <div className="form-group d-flex justify-content-center">
                                <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                    <i
                                        className={`${iconName} fa-3x avatar-icon`}
                                    ></i>
                                </div>
                            </div>
                            <p className="mt-2 text-center">{itemName}</p>
                        </div>
                    );
                })}
            </div>
            {/* end of history section */}

            {/* Best selling products */}
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                    Best Selling
                </h2>
            </div>

            <div className="row justify-content-center mt-4">
                {bestSellingProducts.map(({ iconName, itemName }, index) => {
                    return (
                        <div
                            key={`activity-menu-items-${index}`}
                            className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                        >
                            <div className="form-group d-flex justify-content-center">
                                <div className="d-flex justify-content-center align-items-center p-4 products">
                                    <Image
                                        src={DogFood}
                                        alt="dog food"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                            <p className="mt-2 text-center">{itemName}</p>
                        </div>
                    );
                })}
            </div>
            {/* end of best selling prodcts */}

            {/* Featured Products */}
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                    Featured Products
                </h2>
            </div>

            <div className="row justify-content-center mt-4">
                {featuredProducts.map(({ iconName, itemName }, index) => {
                    return (
                        <div
                            key={`activity-menu-items-${index}`}
                            className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                        >
                            <div className="form-group d-flex justify-content-center">
                                <div className="d-flex justify-content-center align-items-center p-4 products">
                                    <Image
                                        src={DogFood1}
                                        alt="dog food"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                            <p className="mt-2 text-center">{itemName}</p>
                        </div>
                    );
                })}
            </div>
            {/* end of featured products */}

            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <Image
                    alt="Products banner"
                    src={ProductsBanner}
                    height={170}
                />
            </div>

            <ProductsSliderComponent />
        </>
    );
};

export default ProductsTab;

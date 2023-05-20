import Image from 'next/image';
import DogFood from '../../assets/Pedigree.png';
import DogFood1 from '../../assets/dogs-food-2.png';
import ProductsBanner from '../../assets/products-banner.png';
import { useAppSelector } from '../../store/store';
import CommonMenuSlider from '../common/common-menu-slider';
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
    const { petTypes } = useAppSelector((state) => state.petsMetaData);
    return (
        <>
            <div className="row justify-content-center mt-4">
                <CommonMenuSlider>
                    {petTypes.map(({ pc_icon_path, pc_title }, index) => {
                        return (
                            <div
                                key={`history-menu-item-${index}`}
                                className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                            >
                                <div className="form-group d-flex justify-content-center">
                                    <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_ICONS}/${pc_icon_path}`}
                                            alt={pc_title}
                                            height={50}
                                            width={50}
                                        />
                                    </div>
                                </div>
                                <p className="mt-2 text-center">{pc_title}</p>
                            </div>
                        );
                    })}
                </CommonMenuSlider>
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
                            className="mt-2 mx-3 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
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

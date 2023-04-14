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
        itemName: 'Groomers & Trainers',
    },
    {
        iconName: 'fa-solid fa-otter',
        itemName: 'Boarding & Lodging',
    },
    {
        iconName: 'fa-solid fa-shield-cat',
        itemName: 'Vets',
    },
    {
        iconName: 'fa-solid fa-paw',
        itemName: 'Walkers',
    },
    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Photographer',
    },
];

enum ITabs {
    Products,
    Services,
}
const ServicesTab = () => {
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
        </>
    );
};

export default ServicesTab;

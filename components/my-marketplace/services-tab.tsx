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
import ServiceListImg1 from '../../assets/service-list-1.png';
import ServiceListImg2 from '../../assets/service-list-2.png';
import ServiceListImg3 from '../../assets/service-list-3.png';
import ServiceListImg4 from '../../assets/service-list-4.png';

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
    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Sitters',
    },
    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Communication & Telepathy',
    },

    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Bakers & Cafe',
    },

    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Ambulance Taxis',
    },
];

type IServiceListItem = {
    img: any;
    itemName: string;
    location: string;
    mobile: string;
};
const serviceList: IServiceListItem[] = [
    {
        img: ServiceListImg1,
        itemName: 'Heads Up',
        location: 'Kondhwa, Pune',
        mobile: '09808 09099',
    },
    {
        img: ServiceListImg2,
        itemName: 'Barks & Bubbles',
        location: 'Kalyani Nagar, Pune',
        mobile: '08708 09088',
    },
    {
        img: ServiceListImg3,
        itemName: 'Preety Prets Grooming',
        location: 'SB Road, Pune',
        mobile: '06473 88888',
    },
    {
        img: ServiceListImg4,
        itemName: 'Twic & Butch Salon',
        location: 'JM Road, Pune',
        mobile: '09923 89781',
    },
];

enum ITabs {
    Products,
    Services,
}
const ServicesTab = () => {
    const [selectedServiceTab, setSelectedServiceTab] = useState<string>(
        'Groomers & Trainers'
    );
    return (
        <>
            <div className="row mt-4 horizantal-scroll">
                {productsMenuItems.map(({ iconName, itemName }, index) => {
                    return (
                        <div
                            onClick={() => setSelectedServiceTab(itemName)}
                            key={`history-menu-item-${index}`}
                            className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                        >
                            <div className="form-group d-flex justify-content-center">
                                <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                    <i
                                        className={`${iconName} fa-3x avatar-icon ${
                                            selectedServiceTab === itemName
                                                ? ''
                                                : 'text-white'
                                        }`}
                                    ></i>
                                </div>
                            </div>
                            <p className="mt-2 text-center ">{itemName}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                    {selectedServiceTab}
                </h2>
            </div>

            <div className="row justify-content-center mt-4">
                {serviceList.map(
                    ({ itemName, img, location, mobile }, index) => {
                        return (
                            <div
                                key={`activity-menu-items-${index}`}
                                className="mt-2 col-6 col-md-3 d-flex flex-column justify-content-center align-items-center service-item-container"
                            >
                                <div className="justify-content-center align-items-center p-1">
                                    <Image
                                        src={img}
                                        alt={itemName}
                                        height={170}
                                    />
                                </div>
                                <p className="text-center text-bold">
                                    {itemName}
                                </p>
                                <p className="text-center">{location}</p>
                                <p className="text-center">
                                    Contact - {mobile}
                                </p>
                                <button className="btn btn-secondary my-2">
                                    Book Now
                                </button>
                            </div>
                        );
                    }
                )}
            </div>

            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <Image
                    alt="Products banner"
                    src={ProductsBanner}
                    height={170}
                />
            </div>
        </>
    );
};

export default ServicesTab;
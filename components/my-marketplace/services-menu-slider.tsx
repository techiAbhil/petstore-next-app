import { Dispatch, SetStateAction } from 'react';

import 'react-slideshow-image/dist/styles.css';
import CommonMenuSlider from '../common/common-menu-slider';

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
        itemName: 'Communication & Telepathy',
    },
    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Bakers & Cafe',
    },
    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Sitters',
    },

    {
        iconName: 'fa-solid fa-camera',
        itemName: 'Ambulance Taxis',
    },
];

const sliderConfig = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
        },
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
        },
    },
];

const ServicesMenuSliderComponent = ({
    selectedServiceTab,
    setSelectedServiceTab,
}: {
    setSelectedServiceTab: Dispatch<SetStateAction<string>>;
    selectedServiceTab: string;
}) => {
    return (
        <CommonMenuSlider
            totalItems={productsMenuItems?.length}
            customSliderConfig={sliderConfig}
        >
            {productsMenuItems.map(({ iconName, itemName }, index: number) => {
                return (
                    <div
                        onClick={() => setSelectedServiceTab(itemName)}
                        key={`history-menu-item-${index}`}
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
        </CommonMenuSlider>
    );
};

export default ServicesMenuSliderComponent;

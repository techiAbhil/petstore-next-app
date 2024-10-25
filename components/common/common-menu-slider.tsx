import { Fragment, useMemo } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        },
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
    },
];

const CommonMenuSlider = ({
    totalItems,
    children,
    customSliderConfig = [],
    infinite = false,
}: {
    totalItems: number;
    children: React.ReactNode;
    customSliderConfig?: {
        breakpoint: number;
        settings: {
            slidesToShow: number;
            slidesToScroll: number;
        };
    }[];
    infinite?: boolean;
}) => {
    const sliderConfig = useMemo(() => {
        if (customSliderConfig.length > 0) {
            return customSliderConfig;
        }
        if (totalItems < 3) {
            return responsiveSettings.map((conf) => {
                return {
                    ...conf,
                    settings: {
                        slidesToShow: totalItems,
                        slidesToScroll: 1,
                    },
                };
            });
        }
        return responsiveSettings;
    }, [customSliderConfig, totalItems]);
    return (
        <Fragment>
            {totalItems > 0 && (
                <section className="row mt-5 testimonial-section-container">
                    {totalItems > 3 ? (
                        <Slide
                            autoplay={false}
                            responsive={sliderConfig}
                            duration={2500}
                            infinite={infinite}
                        >
                            {children}
                        </Slide>
                    ) : (
                        <div className="testimonial-section-container">
                            {children}
                        </div>
                    )}
                </section>
            )}
        </Fragment>
    );
};

export default CommonMenuSlider;

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
}: {
    totalItems: number;

    children: React.ReactNode;
}) => {
    const sliderConfig = useMemo(() => {
        if (totalItems < 3) {
            return responsiveSettings.map((conf) => {
                return {
                    ...conf,
                    settings: {
                        slidesToShow: totalItems,
                        slidesToScroll: totalItems,
                    },
                };
            });
        }
        return responsiveSettings;
    }, [totalItems]);
    return (
        <Fragment>
            {totalItems > 0 && (
                <section className="row mt-5 testimonial-section-container">
                    <Slide
                        autoplay={false}
                        responsive={sliderConfig}
                        duration={2500}
                    >
                        {children}
                    </Slide>
                </section>
            )}
        </Fragment>
    );
};

export default CommonMenuSlider;

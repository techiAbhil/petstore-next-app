import Image from 'next/image'
import { Fragment } from 'react'
import { Slide } from 'react-slideshow-image'
import TESTIMONAIL_PROFILE from '../../assets/testimonail-profile.png'

import { Stack } from 'react-bootstrap'
import 'react-slideshow-image/dist/styles.css'

type TESTIMOIAL_SLIDER_TYPE = {
    userProfilePic: any
    userName: string
    petRelation: string
    rating: number
    comment: string
}

const testimonials: TESTIMOIAL_SLIDER_TYPE[] = [
    {
        userProfilePic: TESTIMONAIL_PROFILE,
        userName: 'John Wick',
        petRelation: 'Pet Parent',
        rating: 5,
        comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Iusto ipsam ab nemo, beatae minima, nulla quisquam
        repellat`,
    },
    {
        userProfilePic: TESTIMONAIL_PROFILE,
        userName: 'John Wick',
        petRelation: 'Pet Parent',
        rating: 5,
        comment: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Iusto ipsam ab nemo, beatae minima, nulla quisquam
        repella`,
    },
    {
        userProfilePic: TESTIMONAIL_PROFILE,
        userName: 'John Wick',
        petRelation: 'Pet Parent',
        rating: 5,
        comment: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Iusto ipsam ab nemo, beatae minima, nulla quisquam
        repellat`,
    },
]

const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
        },
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
        },
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
    },
]

const HomeTestimonials = () => {
    return (
        <Fragment>
            <section className="row">
                <div className="col-12 d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h1 className="fw-bolder text-center">
                        About Pets and More
                    </h1>
                </div>
            </section>
            <section className="row py-10 sm:py-5 mb-5 sm:mb-2 testimonial-section-container">
                <Slide
                    autoplay={true}
                    responsive={responsiveSettings}
                    duration={2500}
                >
                    {testimonials.map(
                        (
                            {
                                comment,
                                petRelation,
                                rating,
                                userName,
                                userProfilePic,
                            },
                            index: number
                        ) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex flex-column testimonial-card p-5"
                                >
                                    <div>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                    <p className="pt-2">{comment}</p>
                                    <div className="testimonial-bar pb-2"></div>
                                    <Stack
                                        direction="horizontal"
                                        className="pl-2"
                                    >
                                        <Image
                                            src={userProfilePic}
                                            className="img-fluid testimonial-profile"
                                            alt="profile"
                                        />
                                        <Stack className="m-2 d-flex flex-column">
                                            <span className="testimonial-profile-name">
                                                {userName}
                                            </span>
                                            <span className="testimonial-profile-text">
                                                {petRelation}
                                            </span>
                                        </Stack>
                                    </Stack>
                                </div>
                            )
                        }
                    )}
                </Slide>
            </section>
        </Fragment>
    )
}

export default HomeTestimonials

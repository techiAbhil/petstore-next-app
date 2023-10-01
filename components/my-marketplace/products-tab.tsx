import { useRouter } from 'next/router';
import ERROR_IMG from '../../assets/no-image.jpg';
import { useAppSelector } from '../../store/store';
import MyImage from '../common/MyImage';
import CommonMenuSlider from '../common/common-menu-slider';
import ProductCardItem from '../product-card-item';
import ProductsSliderComponent from './products-slider';
import ServicesTab from './services-tab';

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

const ProductsTab = () => {
    const {
        bestSellingProducts,
        petCategories,
        featuredProducts,
        comboProducts,
    } = useAppSelector((store) => store.myMarketplace);
    const router = useRouter();
    return (
        <>
            <div className="row justify-content-center mt-4">
                {comboProducts?.length > 0 ? (
                    <ProductsSliderComponent comboProducts={comboProducts} />
                ) : (
                    <p className="mt-2 text-center text-wrap">
                        No Combo products available.
                    </p>
                )}

                <div className="mt-2 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h3 className="col-sm-12 text-center text-uppercase">
                        Shop Products By Pet Category
                    </h3>
                </div>
                <CommonMenuSlider
                    totalItems={petCategories?.length}
                    customSliderConfig={sliderConfig}
                >
                    {petCategories?.map(
                        ({ pc_icon_path, pc_title, pc_id }, index) => {
                            return (
                                <div
                                    key={`history-menu-item-${index}`}
                                    role="button"
                                    onClick={() =>
                                        router.push(
                                            `/products-by-animal/${pc_title}/${pc_id}`
                                        )
                                    }
                                >
                                    <div className="form-group d-flex justify-content-center">
                                        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                            <MyImage
                                                src={`${process.env.NEXT_PUBLIC_ICONS}/${pc_icon_path}`}
                                                alt={pc_title}
                                                height={50}
                                                width={50}
                                                defaultImage={ERROR_IMG}
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">
                                        {pc_title}
                                    </p>
                                </div>
                            );
                        }
                    )}
                </CommonMenuSlider>
            </div>
            {/* end of history section */}

            {/* Best selling products */}
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h3 className="col-sm-12 text-center text-uppercase">
                    Best Selling Products
                </h3>
            </div>

            <div className="d-flex row justify-content-center align-items-center">
                {bestSellingProducts?.map(
                    (
                        { pr_poster_path, pr_name, pr_id }: any,
                        index: number
                    ) => {
                        return (
                            <div
                                className="col-6 col-md-2 d-flex flex-column justify-content-center mx-4"
                                key={`activity-menu-items-${index}`}
                            >
                                <ProductCardItem
                                    pr_poster_path={pr_poster_path}
                                    pr_id={pr_id}
                                    pr_name={pr_name}
                                />
                            </div>
                        );
                    }
                )}
            </div>

            {/* end of best selling prodcts */}

            {/* Featured Products */}
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h3 className="col-sm-12 text-center text-uppercase">
                    Featured Products
                </h3>
            </div>

            <div className="d-flex row justify-content-center align-items-center">
                {featuredProducts?.map(
                    (
                        { pr_poster_path, pr_name, pr_id }: any,
                        index: number
                    ) => {
                        return (
                            <div
                                className="col-6 col-md-2 d-flex flex-column justify-content-center mx-4"
                                key={`activity-menu-items-${index}`}
                            >
                                <ProductCardItem
                                    pr_poster_path={pr_poster_path}
                                    pr_id={pr_id}
                                    pr_name={pr_name}
                                />
                            </div>
                        );
                    }
                )}
            </div>

            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h3 className="col-sm-12 text-center text-uppercase">
                    Services
                </h3>
            </div>
            <ServicesTab />

            {/* end of featured products */}

            {/* <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <Image
                    alt="Products banner"
                    src={ProductsBanner}
                    height={170}
                    width={180}
                />
            </div> */}
        </>
    );
};

export default ProductsTab;

import Image from 'next/image';
import ProductsBanner from '../../assets/products-banner.png';
import { useAppSelector } from '../../store/store';
import CommonMenuSlider from '../common/common-menu-slider';
import ProductsSliderComponent from './products-slider';

const ProductsTab = () => {
    const {
        bestSellingProducts,
        petCategories,
        featuredProducts,
        comboProducts,
    } = useAppSelector((store) => store.myMarketplace);
    return (
        <>
            <div className="row justify-content-center mt-4">
                <CommonMenuSlider>
                    {petCategories.map(({ pc_icon_path, pc_title }, index) => {
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

            <div className="d-flex row justify-content-center align-items-center mt-4">
                {bestSellingProducts.map(
                    ({ pr_poster_path, pr_name }, index) => {
                        return (
                            <div
                                key={`activity-menu-items-${index}`}
                                className="mt-2 col-md-4 col-12 justify-content-center align-items-center"
                            >
                                <div className="form-group d-flex justify-content-center">
                                    <div className="d-flex justify-content-center align-items-center p-4 products">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                                            alt="best selling dog food"
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                </div>
                                <p className="mt-2 text-center text-wrap">
                                    {pr_name}
                                </p>
                            </div>
                        );
                    }
                )}
            </div>
            {/* end of best selling prodcts */}

            {/* Featured Products */}
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                    Featured Products
                </h2>
            </div>

            <div className="row justify-content-center mt-4">
                {featuredProducts.map(({ pr_poster_path, pr_name }, index) => {
                    return (
                        <div
                            key={`activity-menu-items-${index}`}
                            className="mt-2 mx-3 col-12 col-md-4 d-flex flex-column justify-content-center align-items-center"
                        >
                            <div className="form-group d-flex justify-content-center">
                                <div className="d-flex justify-content-center align-items-center p-4 products">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                                        alt="featured product dog food"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                            <p className="mt-2 text-center text-wrap">
                                {pr_name}
                            </p>
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
                    width={180}
                />
            </div>
            {comboProducts.length > 0 ? (
                <ProductsSliderComponent comboProducts={comboProducts} />
            ) : (
                <p className="mt-2 text-center text-wrap">
                    No Combo products available.
                </p>
            )}
        </>
    );
};

export default ProductsTab;

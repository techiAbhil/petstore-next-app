import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import Articles from '../../components/my-petosphare-sub-component/articles';
import { getMyPetOSPhareeData } from '../../store/my-pet-o-sphare-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const MyMarketplace = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, isError, error } = useAppSelector(
        (store) => store.myMarketplace
    );

    useEffect(() => {
        dispatch(getMyPetOSPhareeData(undefined));
    }, [dispatch]);

    return (
        <Layout>
            <section className="mt-3 mb-5 container">
                {!isLoading && isError && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            {typeof error === 'string'
                                ? error
                                : 'Can not fetch marketplace data!'}
                        </h2>
                    </div>
                )}
                <CustomLoader show={isLoading} />
                {isLoading && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            Loading Please wait!!!
                        </h2>
                    </div>
                )}

                {!isLoading && !isError && <Articles />}
            </section>
            <Footer />
        </Layout>
    );
};

export default MyMarketplace;

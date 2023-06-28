import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DefaultPet from '../../assets/default-pet.png';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserDashboardData } from '../../store/user-dashboard-slice';

type IMenuItem = {
    iconName: string;
    itemName: string;
    navigateTo: string;
};

const historyMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-syringe',
        itemName: 'Vaccination',
        navigateTo: '/vaccination',
    },
    {
        iconName: 'fa-solid fa-virus-covid',
        itemName: 'Parasite Prevention',
        navigateTo: '/parasite-prevenetion',
    },
    {
        iconName: 'fa-solid fa-shield-cat',
        itemName: 'Grooming',
        navigateTo: '/grooming',
    },
    {
        iconName: 'fa-solid fa-weight-scale',
        itemName: 'Measurements',
        navigateTo: '/measurement',
    },
    {
        iconName: 'fa-solid fa-laptop-medical',
        itemName: 'Episodes & Symptomatic History',
        navigateTo: '/episodes',
    },
    {
        iconName: 'fa-solid fa-capsules',
        itemName: 'Medication & Supplements',
        navigateTo: '/medication-and-supplements',
    },
];

const activityLogMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-burger',
        itemName: 'Food',
        navigateTo: '/food',
    },
    {
        iconName: 'fa-solid fa-shoe-prints',
        itemName: 'Walk',
        navigateTo: '/',
    },
    {
        iconName: 'fa-solid fa-dumbbell',
        itemName: 'Training',
        navigateTo: '/training',
    },
    {
        iconName: 'fa-solid fa-hands-bubbles',
        itemName: 'Pee',
        navigateTo: '/',
    },
    {
        iconName: 'fa-solid fa-toilet',
        itemName: 'Poop',
        navigateTo: '/',
    },
];

const expensesMenuItems: IMenuItem[] = [
    // {
    //     iconName: 'fa-solid fa-wallet',
    //     itemName: 'Add Expenses',
    // },
    {
        iconName: 'fa-solid fa-money-bill-transfer',
        itemName: 'Expenses',
        navigateTo: '/expenses',
    },
];

const MyPet = () => {
    const dispatch = useAppDispatch();
    const { error, isError, isLoading, family, petDetails, pets, reminders } =
        useAppSelector((state) => state.userDashboard);

    const router = useRouter();

    useEffect(() => {
        dispatch(getUserDashboardData(undefined));
    }, [dispatch]);
    return (
        <Layout>
            <section className="my-5 container">
                {/* basic info */}
                {/* history section */}
                <CustomLoader show={isLoading} />

                {pets.length > 0 && (
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                            My Pets
                        </h2>
                    </div>
                )}

                <div className="row justify-content-center mt-4">
                    {pets?.map(
                        ({ petId, imgUrl, name, age, gender }, index) => {
                            return (
                                <div
                                    key={`activity-menu-items-${petId}`}
                                    className="bg-secondary-container mt-2 mx-3 col-12 col-md-4 d-flex flex-column justify-content-center align-items-center br-15"
                                >
                                    <div className="form-group d-flex justify-content-center">
                                        <div className="d-flex justify-content-center align-items-center py-5">
                                            <Image
                                                src={
                                                    imgUrl
                                                        ? `${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${imgUrl}`
                                                        : DefaultPet
                                                }
                                                alt="featured product dog food"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                    </div>
                                    <div className="row center">
                                        <h4 className="mt-2 text-center text-wrap text-uppercase ">
                                            {name}
                                        </h4>
                                        <p className="mt-2 text-center text-wrap text-secondary">
                                            {age} Years Old
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                {/* end of basic info */}

                {/* history section */}
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        History
                    </h2>
                </div>

                <div className="row justify-content-center mt-4 ">
                    {historyMenuItems.map(
                        ({ iconName, itemName, navigateTo }, index) => {
                            return (
                                <div
                                    key={`history-menu-item-${index}`}
                                    className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
                                >
                                    <div
                                        className="form-group d-flex justify-content-center"
                                        role="button"
                                        onClick={() => router.push(navigateTo)}
                                    >
                                        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                            <i
                                                className={`${iconName} fa-3x avatar-icon`}
                                            ></i>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">
                                        {itemName}
                                    </p>
                                </div>
                            );
                        }
                    )}
                </div>
                {/* end of history section */}

                {/* Expense section */}
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        Expense
                    </h2>
                </div>

                <div className="row justify-content-center mt-4">
                    {expensesMenuItems.map(
                        ({ iconName, itemName, navigateTo }, index) => {
                            return (
                                <div
                                    key={`activity-menu-items-${index}`}
                                    className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
                                >
                                    <div
                                        className="form-group d-flex justify-content-center"
                                        role="button"
                                        onClick={() => router.push(navigateTo)}
                                    >
                                        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                            <i
                                                className={`${iconName} fa-3x avatar-icon`}
                                            ></i>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">
                                        {itemName}
                                    </p>
                                </div>
                            );
                        }
                    )}
                </div>
                {/* end of Expense section */}

                {/* activity log section */}
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        Daily Activity Log
                    </h2>
                </div>

                <div className="row justify-content-center mt-4">
                    {activityLogMenuItems.map(
                        ({ iconName, itemName, navigateTo }, index) => {
                            return (
                                <div
                                    key={`activity-menu-items-${index}`}
                                    className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
                                >
                                    <div
                                        className="form-group d-flex justify-content-center"
                                        role="button"
                                        onClick={() => router.push(navigateTo)}
                                    >
                                        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
                                            <i
                                                className={`${iconName} fa-3x avatar-icon`}
                                            ></i>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-center">
                                        {itemName}
                                    </p>
                                </div>
                            );
                        }
                    )}
                </div>
                {/* end of activity log section */}
            </section>
            <Footer />
        </Layout>
    );
};

export default MyPet;

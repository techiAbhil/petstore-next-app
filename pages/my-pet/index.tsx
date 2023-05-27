import Image from 'next/image';
import { useEffect } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserDashboardData } from '../../store/user-dashboard-slice';

type IMenuItem = {
    iconName: string;
    itemName: string;
};

const historyMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-syringe',
        itemName: 'Vaccination',
    },
    {
        iconName: 'fa-solid fa-virus-covid',
        itemName: 'Parasite Prevention',
    },
    {
        iconName: 'fa-solid fa-shield-cat',
        itemName: 'Grooming',
    },
    {
        iconName: 'fa-solid fa-weight-scale',
        itemName: 'Measurements',
    },
    {
        iconName: 'fa-solid fa-laptop-medical',
        itemName: 'Episodes & Symptomatic History',
    },
    {
        iconName: 'fa-solid fa-capsules',
        itemName: 'Medication & Supplements',
    },
];

const activityLogMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-burger',
        itemName: 'Food',
    },
    {
        iconName: 'fa-solid fa-shoe-prints',
        itemName: 'Walk',
    },
    {
        iconName: 'fa-solid fa-dumbbell',
        itemName: 'Training',
    },
    {
        iconName: 'fa-solid fa-hands-bubbles',
        itemName: 'Pee',
    },
    {
        iconName: 'fa-solid fa-toilet',
        itemName: 'Poop',
    },
];

const expensesMenuItems: IMenuItem[] = [
    {
        iconName: 'fa-solid fa-wallet',
        itemName: 'Add Expenses',
    },
    {
        iconName: 'fa-solid fa-money-bill-transfer',
        itemName: 'Expense History',
    },
];

const MyPet = () => {
    const dispatch = useAppDispatch();
    const { error, isError, isLoading, family, petDetails, pets, reminders } =
        useAppSelector((state) => state.userDashboard);

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
                                            {imgUrl ? (
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${imgUrl}`}
                                                    alt="featured product dog food"
                                                    height={100}
                                                    width={100}
                                                />
                                            ) : (
                                                <h5 className="text-grey text-center align-items-center">
                                                    Pet image unavailable
                                                </h5>
                                            )}
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
                    {historyMenuItems.map(({ iconName, itemName }, index) => {
                        return (
                            <div
                                key={`history-menu-item-${index}`}
                                className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
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
                {/* end of history section */}

                {/* Expense section */}
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        Expense
                    </h2>
                </div>

                <div className="row justify-content-center mt-4">
                    {expensesMenuItems.map(({ iconName, itemName }, index) => {
                        return (
                            <div
                                key={`activity-menu-items-${index}`}
                                className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
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
                {/* end of Expense section */}

                {/* activity log section */}
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        Daily Activity Log
                    </h2>
                    <p className="text-center px-5 font-grey">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quibusdam explicabo error cupiditate enim animi sed
                        repellendus, iste cum quidem totam. Iste incidunt illo
                        eos non!
                    </p>
                </div>

                <div className="row justify-content-center mt-4">
                    {activityLogMenuItems.map(
                        ({ iconName, itemName }, index) => {
                            return (
                                <div
                                    key={`activity-menu-items-${index}`}
                                    className="mt-2 col-6 col-md-4 d-flex flex-column justify-content-center align-items-center"
                                >
                                    <div className="form-group d-flex justify-content-center">
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

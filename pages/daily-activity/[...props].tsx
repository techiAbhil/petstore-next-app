import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import DailyActivityBanner from '../../assets/activity-log-banner.png';

import FoodActivityImg from '../../assets/food-activity.png';
import PeeActivityImg from '../../assets/pee-activity.png';
import PoopActivityImg from '../../assets/poop-activity.png';
import TrainingActivityImg from '../../assets/training-activity.png';
import WalkActivityImg from '../../assets/walk-activity.png';
import FoodActivity from '../../components/daiily-activity-tab-components/food';
import PeeActivity from '../../components/daiily-activity-tab-components/pee';
import PoopActivity from '../../components/daiily-activity-tab-components/poop';
import TrainingActivity from '../../components/daiily-activity-tab-components/training';
import WalkActivity from '../../components/daiily-activity-tab-components/walk';
import Layout from '../../components/layout/layout';
import { useGetUserSelectedPet } from '../../hooks/useGetUserSelectedPet.hook';

const TabTitle = ({ title, img }: { title: string; img: any }) => {
    return (
        <div className="center">
            <Image
                src={img}
                className="img-fluid activity-tab-image"
                alt={title}
            />
            <div className="px-3">
                <span>{title}</span>
            </div>
        </div>
    );
};

const DailiyActivity = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [urlKey]: any = routePorps ?? [''];
    const selectedPet = useGetUserSelectedPet();
    const [key, setKey] = useState(urlKey);
    useEffect(() => {
        urlKey && setKey(urlKey);
    }, [urlKey]);

    return (
        <Layout>
            <Head>
                <title>Daily Activity Log</title>
            </Head>
            <section className="mx-3 pet-assistant-tab non-bordered-tab">
                <div className="mb-2 center">
                    <Image
                        src={DailyActivityBanner}
                        className="img-fluid rounded"
                        alt="Responsive image"
                        onClick={() => router.push('/')}
                    />
                </div>
                <div className="container">
                    {selectedPet && (
                        <Tabs
                            defaultActiveKey="profile"
                            id="pet-assistant-tab"
                            className="mb-3"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            fill
                        >
                            <Tab
                                eventKey="Food"
                                title={
                                    <TabTitle
                                        title={'Food'}
                                        img={FoodActivityImg}
                                    />
                                }
                            >
                                <FoodActivity />
                            </Tab>
                            <Tab
                                eventKey="Walk"
                                title={
                                    <TabTitle
                                        title={'Walk'}
                                        img={WalkActivityImg}
                                    />
                                }
                            >
                                <WalkActivity />
                            </Tab>

                            <Tab
                                eventKey="Training"
                                title={
                                    <TabTitle
                                        title={'Training'}
                                        img={TrainingActivityImg}
                                    />
                                }
                            >
                                <TrainingActivity />
                            </Tab>
                            <Tab
                                eventKey="Pee"
                                title={
                                    <TabTitle
                                        title={'Pee'}
                                        img={PeeActivityImg}
                                    />
                                }
                            >
                                <PeeActivity />
                            </Tab>

                            <Tab
                                eventKey="Poop"
                                title={
                                    <TabTitle
                                        title={'Poop'}
                                        img={PoopActivityImg}
                                    />
                                }
                            >
                                <PoopActivity />
                            </Tab>
                        </Tabs>
                    )}
                    {!selectedPet && (
                        <p className="text-center text-uppercase text-secondary fw-bold my-1">
                            You do not have any pets!!!
                        </p>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default DailiyActivity;

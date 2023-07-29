import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Layout from '../../components/layout/layout';
import Episodes from '../../components/my-pets-tabs-components/episodes';
import Grooming from '../../components/my-pets-tabs-components/grooming';
import Measurement from '../../components/my-pets-tabs-components/measurement';
import MedicationAndSupplements from '../../components/my-pets-tabs-components/medication-and-supplements';
import ParasitePrevention from '../../components/my-pets-tabs-components/parasite-prevenetion';
import Vaccination from '../../components/my-pets-tabs-components/vaccination';
import { useGetUserSelectedPet } from '../../hooks/useGetUserSelectedPet.hook';

const MyPetAssitant = () => {
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
                <title>My Pet Assistant</title>
            </Head>
            <section className="mt-3 mb-5 container pet-assistant-tab">
                {selectedPet && (
                    <Tabs
                        defaultActiveKey="profile"
                        id="pet-assistant-tab"
                        className="mb-3"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        fill
                    >
                        <Tab eventKey="Vaccination" title="Vaccination">
                            <Vaccination />
                        </Tab>
                        <Tab eventKey="Parasite" title="Parasite Prevention">
                            <ParasitePrevention />
                        </Tab>

                        <Tab eventKey="Grooming" title="Grooming">
                            <Grooming />
                        </Tab>
                        <Tab eventKey="Measurements" title="Measurements">
                            <Measurement />
                        </Tab>

                        <Tab
                            eventKey="Episodes"
                            title="Episodes & Symptomatic History"
                        >
                            <Episodes />
                        </Tab>
                        <Tab
                            eventKey="Medication"
                            title="Medication & Supplements"
                        >
                            <MedicationAndSupplements />
                        </Tab>
                    </Tabs>
                )}
                {!selectedPet && (
                    <p className="text-center text-uppercase text-secondary fw-bold my-1">
                        You do not have any pets!!!
                    </p>
                )}
            </section>
        </Layout>
    );
};

export default MyPetAssitant;

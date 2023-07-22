import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Layout from '../../components/layout/layout';

const MyPetAssitant = () => {
    const router = useRouter();
    const routePorps = router.query.props;
    const [urlKey]: any = routePorps ?? [''];
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
                <Tabs
                    defaultActiveKey="profile"
                    id="pet-assistant-tab"
                    className="mb-3"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    fill
                >
                    <Tab eventKey="Vaccination" title="Vaccination">
                        Vaccination
                    </Tab>
                    <Tab eventKey="Parasite" title="Parasite Prevention">
                        Parasite Prevention
                    </Tab>

                    <Tab eventKey="Grooming" title="Grooming">
                        Grooming
                    </Tab>
                    <Tab eventKey="Measurements" title="Measurements">
                        Measurements
                    </Tab>

                    <Tab
                        eventKey="Episodes"
                        title="pisodes & Symptomatic History"
                    >
                        Episodes & Symptomatic History
                    </Tab>
                    <Tab eventKey="Medication" title="Medication & Supplements">
                        Medication & Supplements
                    </Tab>
                </Tabs>
            </section>
        </Layout>
    );
};

export default MyPetAssitant;

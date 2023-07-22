import PetSelectDropdown from '../../components/common/PetSelectDropdown';
import Layout from '../../components/layout/layout';

const Vaccination = () => {
    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                {/* pet dropdown start */}
                <div className="center">
                    <PetSelectDropdown />
                </div>
                {/* pet dropdown end */}
            </section>
        </Layout>
    );
};

export default Vaccination;

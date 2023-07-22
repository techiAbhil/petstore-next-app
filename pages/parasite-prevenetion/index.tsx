import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomLoader from '../../components/common/CustomLoader';
import PetSelectDropdown from '../../components/common/PetSelectDropdown';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const COLS: string[] = [
    'Medicine Name',
    'Date of Medicine',
    'Next Due Date',
    'Number Of Medicine',
    'Medicine Type',
];

const ParasitePrevention = () => {
    const [parasiteList, setParasiteList] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/parasite-prevention`
                );
                if (Array.isArray(data?.medicines)) {
                    setParasiteList(data.medicines);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, []);
    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                {/* pet dropdown start */}
                <div className="col-center ">
                    <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                            Parasite Prevention
                        </h4>
                    </div>
                    <PetSelectDropdown />
                </div>
                <CustomLoader show={isLoading} />
                <div className="center mt-2">
                    {parasiteList.length > 0 ? (
                        <Table responsive bordered>
                            <thead>
                                <tr>
                                    {COLS.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parasiteList.map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-capitalize">
                                                {v?.md_medicine_name}
                                            </td>
                                            <td>{v?.md_date_of_medicine}</td>
                                            <td>{v?.md_next_date}</td>
                                            <td>{v?.md_number_of_medicine}</td>
                                            <td>{v?.md_medicine_type}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                            <h2 className="pt-1 col-sm-12 text-center">
                                {!isLoading ? 'No Records found!' : ''}
                            </h2>
                        </div>
                    )}
                </div>
                {/* pet dropdown end */}
            </section>
        </Layout>
    );
};

export default ParasitePrevention;

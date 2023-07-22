import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomLoader from '../../components/common/CustomLoader';
import PetSelectDropdown from '../../components/common/PetSelectDropdown';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const COLS: string[] = [
    'Vaccine Name',
    'Date of Vaccination',
    'Is Recurring',
    'Next Vaccination Date',
    'Notes',
];

const Vaccination = () => {
    const [vaccines, setVaccines] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/vaccine`
                );
                debugger;
                if (Array.isArray(data?.vaccines)) {
                    setVaccines(data.vaccines);
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
                <div className="center">
                    <PetSelectDropdown />
                </div>
                <CustomLoader show={isLoading} />
                <div className="center mt-5">
                    <Table responsive bordered>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {vaccines.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="text-capitalize">
                                            {v?.vc_name}
                                        </td>
                                        <td>{v?.vc_date}</td>
                                        <td>
                                            {v?.vc_is_recurring ? 'Yes' : 'No'}
                                        </td>
                                        <td>{v?.vc_next_date}</td>
                                        <td>{v?.vc_note}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                {/* pet dropdown end */}
            </section>
        </Layout>
    );
};

export default Vaccination;

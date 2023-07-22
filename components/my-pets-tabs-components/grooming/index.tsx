import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../store/store';
import CustomLoader from '../../common/CustomLoader';
import PetSelectDropdown from '../../common/PetSelectDropdown';

const COLS: string[] = ['Grooming Activity', 'Activity Date', 'Next Due Date'];

const Grooming = () => {
    const [groomings, setGroomingsList] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/grooming`
                );
                if (Array.isArray(data?.groomings)) {
                    setGroomingsList(data.groomings);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, [selectedPetIDForMarketplace]);
    return (
        <section className="mt-1 mb-1 container">
            {/* pet dropdown start */}
            <div className="col-center ">
                <PetSelectDropdown />
            </div>
            <CustomLoader show={isLoading} />
            <div className="center mt-2">
                {groomings.length > 0 ? (
                    <Table responsive striped>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groomings.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="text-capitalize">
                                            {v?.gm_activity}
                                        </td>
                                        <td>{v?.gm_activity_date}</td>
                                        <td>{v?.gm_next_due_date}</td>
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
    );
};

export default Grooming;

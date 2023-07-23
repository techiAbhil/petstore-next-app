import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../store/store';
import CustomLoader from '../../common/CustomLoader';
import PetSelectDropdown from '../../common/PetSelectDropdown';

const COLS: string[] = ['Timestamp', 'Distance (Meters)', 'Time (Miliseconds)'];

const WalkActivity = () => {
    const [walks, setWalks] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/walk`
                );
                if (Array.isArray(data?.walks)) {
                    setWalks(data.walks);
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
            <div className="col-center">
                <PetSelectDropdown />
            </div>
            <CustomLoader show={isLoading} />
            <div className="center mt-2">
                {walks.length > 0 ? (
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {walks.map((v: any, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td>{v?.pw_timestamp}</td>
                                        <td>{v?.pw_distance_in_meters}</td>
                                        <td>{v?.pw_time_in_millis}</td>
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

export default WalkActivity;

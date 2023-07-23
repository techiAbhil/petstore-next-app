import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../store/store';
import CustomLoader from '../../common/CustomLoader';
import PetSelectDropdown from '../../common/PetSelectDropdown';

const COLS: string[] = [
    'Training Name',
    'Trainer Name',
    'Trainer Mobile No',
    'Duration',
    'Date',
    'Remark',
];

const TrainingActivity = () => {
    const [trainings, setTrainings] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/training`
                );
                if (Array.isArray(data?.trainings)) {
                    setTrainings(data.trainings);
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
                {trainings.length > 0 ? (
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {trainings.map((v: any, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td className="text-capitalize">
                                            {v?.ta_name}
                                        </td>
                                        <td className="text-capitalize">
                                            {v?.ta_trainer_name}
                                        </td>

                                        <td>{v?.ta_trainer_mobile_number}</td>

                                        <td>{v?.ta_duration}</td>

                                        <td>{v?.ta_date}</td>
                                        <td>{v?.ta_remark}</td>
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

export default TrainingActivity;

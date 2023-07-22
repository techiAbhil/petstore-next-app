import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../store/store';
import CustomLoader from '../../common/CustomLoader';
import PetSelectDropdown from '../../common/PetSelectDropdown';

const COLS_MEDICATION: string[] = [
    'Medicine Name',
    'Start Date',
    'Date Of Closure',
    'No Of Dosage',
    'Period',
    'Is Vet Recommended',
    'Vet Name',
    'Vet City',
];

const COLS_SUPPLEMENTS: string[] = [
    'Supplement Name',
    'Start Date',
    'Date Of Closure',
    'No Of Dosage',
    'Period',
    'Is Vet Recommended',
    'Vet Name',
    'Vet City',
];
const MedicationAndSupplements = () => {
    const [medicationAndSupplement, setMedicationAndSupplementData] =
        useState<any>();
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/medications-supplements`
                );
                if (data?.data) {
                    setMedicationAndSupplementData(data.data);
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
                <div className="mt-3 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                        Medication Summary
                    </h4>
                </div>
            </div>
            <CustomLoader show={isLoading} />
            <div className="center mt-2">
                {medicationAndSupplement?.medications?.length > 0 ? (
                    <Table responsive striped>
                        <thead>
                            <tr>
                                {COLS_MEDICATION.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {medicationAndSupplement?.medications?.map(
                                (v: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-capitalize">
                                                {v?.md_medicine_name}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_start_date}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_end_date}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_dosage}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_period}{' '}
                                                {v?.md_period_type}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_vet_recommended
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_vet_name}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.md_vet_city}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
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

            <div className="col-center mt-3">
                <div className="row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                        Supplements Summary
                    </h4>
                </div>
            </div>
            <div className="center mt-2">
                {medicationAndSupplement?.supplements?.length > 0 ? (
                    <Table responsive striped>
                        <thead>
                            <tr>
                                {COLS_SUPPLEMENTS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {medicationAndSupplement?.supplements?.map(
                                (v: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-capitalize">
                                                {v?.sp_supplement_name}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_start_date}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_end_date}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_dosage}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_period}{' '}
                                                {v?.sp_period_type}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_vet_recommended
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_vet_name}
                                            </td>
                                            <td className="text-capitalize">
                                                {v?.sp_vet_city}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
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

export default MedicationAndSupplements;

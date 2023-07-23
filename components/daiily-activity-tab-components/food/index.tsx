import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../../store/store';
import CustomLoader from '../../common/CustomLoader';
import PetSelectDropdown from '../../common/PetSelectDropdown';

const COLS: string[] = [
    'Meal Type',
    'Name',
    'Product Name',
    'Menu',
    'Description',
    'Notes',
    'Date & Time',
];

const FoodActivity = () => {
    const [foods, setFoods] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/food`
                );
                if (Array.isArray(data?.foods)) {
                    setFoods(data.foods);
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
                {foods.length > 0 ? (
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {foods.map((v: any, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td className="text-capitalize">
                                            {v?.fa_meal_type}
                                        </td>
                                        <td>{v?.ft_name}</td>
                                        <td>{v?.pb_name}</td>
                                        <td>{v?.fa_menu}</td>
                                        <td>{v?.fa_description}</td>
                                        <td>{v?.fa_notes}</td>
                                        <td>
                                            {v?.fa_time} {v?.fa_date}
                                        </td>
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

export default FoodActivity;
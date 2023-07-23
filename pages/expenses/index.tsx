import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';

import CustomLoader from '../../components/common/CustomLoader';
import PetSelectDropdown from '../../components/common/PetSelectDropdown';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const COLS: string[] = [
    'Category',
    'Subcategory',
    'Amount',
    'Expense Date',
    'Note',
];

const Vaccination = () => {
    const [expenses, setExpenses] = useState<any[]>([]);
    const { selectedPetIDForMarketplace } = useAppSelector(
        (state) => state.userSelectedOptions
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `pet/${selectedPetIDForMarketplace}/expense`
                );
                if (Array.isArray(data?.expenses)) {
                    setExpenses(data.expenses);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, [selectedPetIDForMarketplace]);

    const totalExpense = useMemo(() => {
        return expenses.reduce((sum, exp) => sum + exp?.ex_amount, 0);
    }, [expenses]);
    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                {/* pet dropdown start */}
                <div className="col-center">
                    <div className="mt-3 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                            Expenses
                        </h4>
                    </div>
                    <PetSelectDropdown />
                </div>
                <CustomLoader show={isLoading} />
                <div className="center mt-2">
                    {expenses.length > 0 ? (
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    {COLS.map((col) => (
                                        <th key={col}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((v: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td className="text-capitalize">
                                                {v?.ec_category}
                                            </td>
                                            <td>{v?.esc_subcategory}</td>
                                            <td>
                                                {v?.ex_amount} {v?.ex_currency}
                                            </td>
                                            <td>{v?.ex_date}</td>
                                            <td>{v?.ex_note}</td>
                                        </tr>
                                    );
                                })}
                                <tr className="total-expense-row">
                                    <td colSpan={4}>Total expenses so far</td>
                                    <td colSpan={1}>INR {totalExpense}</td>
                                </tr>
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

export default Vaccination;

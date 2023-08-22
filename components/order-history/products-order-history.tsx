import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import CustomLoader from '../common/CustomLoader';

const COLS: string[] = [
    'Date Time',
    'Delivery Address',
    'Delivery Charges',
    'Subtotal',
    'Total',
    'Status',
];

const ProductsOrderHistory = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(`marketplace/order`);
                if (data?.orders) {
                    setOrders(data.orders);
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
        <div className="row justify-content-center mt-4">
            <CustomLoader show={isLoading} />
            <div className="center mt-2">
                {orders && orders.length > 0 ? (
                    <Table responsive striped>
                        <thead>
                            <tr>
                                {COLS.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((v: any, i: number) => {
                                return (
                                    <tr
                                        key={i}
                                        role="button"
                                        onClick={() =>
                                            router.push(
                                                `/order-details/${v?.or_id}`
                                            )
                                        }
                                    >
                                        <td className="text-capitalize">
                                            {moment(v?.or_date_time).format(
                                                'DD-MMM-YYYY'
                                            )}
                                        </td>
                                        <td>{v?.or_delivery_address}</td>
                                        <td>{v?.or_delivery_charges}</td>
                                        <td>{v?.or_subtotal}</td>
                                        <td>{v?.or_total}</td>
                                        <td>
                                            <Badge bg="success" pill>
                                                {v?.or_status}
                                            </Badge>
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
        </div>
    );
};

export default ProductsOrderHistory;

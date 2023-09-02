import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CustomLoader from '../../components/common/CustomLoader';
import Footer from '../../components/home/footer';
import Layout from '../../components/layout/layout';
import { useAppDispatch } from '../../store/store';

const OrderDetails = () => {
    const router = useRouter();
    const props = router.query.props;
    const [order_id]: any = props ?? [''];
    const disptach = useAppDispatch();

    const [orderDetails, setOrderDetails] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data: any = await axios.get(
                    `marketplace/order/${order_id}`
                );
                if (data?.order) {
                    setOrderDetails(data.order);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the data');
            }
        })();
    }, [order_id]);

    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        Order Details
                    </h2>
                </div>

                {orderDetails?.order_items?.length > 0 && (
                    <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="order-tr">
                                    <td align="center">
                                        Order#: {orderDetails?.or_id}
                                    </td>
                                    <td align="center" valign="middle">
                                        Date:{' '}
                                        {moment(
                                            orderDetails?.or_date_time
                                        ).format('DD-MMM-YYYY')}
                                    </td>
                                    <td align="center">
                                        Subtotal: {orderDetails?.or_subtotal}
                                    </td>
                                    <td align="center" valign="middle">
                                        Total: {orderDetails?.or_total}
                                    </td>
                                </tr>
                                <tr className="order-tr">
                                    <td colSpan={3} align="center">
                                        Delivery Address:{' '}
                                        {orderDetails?.or_delivery_address}
                                    </td>
                                    <td align="center">
                                        {' '}
                                        <Badge bg="success" pill>
                                            {orderDetails?.or_status}
                                        </Badge>
                                    </td>
                                </tr>
                                {orderDetails.order_items?.map(
                                    (item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td align="center">
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${item?.pr_poster_path}`}
                                                        alt={item?.pr_name}
                                                        height={50}
                                                        width={50}
                                                    />
                                                </td>
                                                <td
                                                    align="center"
                                                    valign="middle"
                                                >
                                                    {item?.pr_name}
                                                </td>

                                                <td
                                                    align="center"
                                                    valign="middle"
                                                >
                                                    {item?.ct_qty}
                                                </td>

                                                <td
                                                    align="center"
                                                    valign="middle"
                                                >
                                                    {item?.ct_qty *
                                                        item?.ct_price}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </section>
            <CustomLoader show={isLoading} />
            <Footer />
        </Layout>
    );
};

export default OrderDetails;

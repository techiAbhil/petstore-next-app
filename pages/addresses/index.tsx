import axios from 'axios';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const Addresses = () => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const user = useAppSelector((state) => state.user);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const subTotal: number = useMemo(() => {
        if (cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => {
            return total + item?.ct_price * item?.ct_qty;
        }, 0);
    }, [cartItems]);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const { addresses }: any = await axios.get(`/user/address`);
                if (Array.isArray(addresses)) {
                    const primaryAddress = addresses.find(
                        (address) => address?.ad_is_primary !== true
                    );
                    setSelectedAddress(primaryAddress);
                    setAddresses(addresses);
                }
                setIsLoading(false);
            } catch (e) {
                alert('Something went wrong! please try again!');
                setIsLoading(false);
                console.log('could not fetch the addresses');
            }
        })();
    }, []);

    const [isOrderInfoFetching, setIsOrderInfoFetching] =
        useState<boolean>(false);

    const initiatePayment = useCallback(
        (address: string = '') => {
            const paymentOptions = {
                key: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
                amount: `${subTotal}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'PetsNMore', //your business name
                description: 'Test Transaction',
                order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (response: any) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                },
                prefill: {
                    name: user.us_full_name, //your customer's name
                    email: user.us_email,
                    contact: user.us_phone, //Provide the customer's phone number for better conversion rates
                },
                notes: {
                    address: address,
                },
                theme: {
                    color: '#3399cc',
                },
            };
        },
        [subTotal, user.us_email, user.us_full_name, user.us_phone]
    );

    const getPaymentDetails = useCallback(async () => {
        try {
            if (!selectedAddress) {
                alert('Please select address!');
                return;
            } else if (cartItems.length === 0) {
                alert('Please Add Items to your cart!');
                return;
            }
            setIsOrderInfoFetching(true);
            const cartItemIds = cartItems.map((c) => +c?.ct_id);
            if (cartItemIds.length <= 0) {
                alert('No cart items found!');
                return;
            }
            const address = `${selectedAddress?.ad_address}, ${selectedAddress?.ad_city},${selectedAddress?.ad_state}, ${selectedAddress?.ad_country}, ${selectedAddress?.ad_zip}`;
            const result: any = await axios.post(`/marketplace/cart/checkout`, {
                currency: 'INR',
                address_title: selectedAddress?.ad_title,
                address: address,
                cart_items: cartItemIds,
            });
            if (result.message === 'Success') {
                initiatePayment(address);
                alert('Redircet to payment gateway pending implementation');
            }
            setIsOrderInfoFetching(false);
        } catch (e) {
            alert('Something went wrong! please try again!');
            setIsOrderInfoFetching(false);
            console.log('could not fetch the order details');
        }
    }, [cartItems, initiatePayment, selectedAddress]);

    return (
        <Layout>
            <Head>
                <title>Address</title>
                <script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    async
                ></script>
            </Head>
            <section className="mt-1 mb-1 container">
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h4 className="pt-1 col-sm-12 text-center text-uppercase">
                        {!isLoading && addresses.length === 0
                            ? 'No Addresses found!'
                            : 'Select Delivery Address'}
                    </h4>
                </div>
                <CustomLoader show={isLoading || isOrderInfoFetching} />
                <div className="col-center my-2">
                    {addresses.length > 0 &&
                        addresses.map(
                            ({
                                ad_id,
                                ad_title,
                                ad_zip,
                                ad_country,
                                ad_state,
                                ad_city,
                                ad_address,
                            }) => {
                                return (
                                    <div
                                        key={ad_id}
                                        className="bottom-ruler col-md-6 col-sm-12 mt-2"
                                        role="button"
                                        onClick={() =>
                                            setSelectedAddress(ad_id ?? '')
                                        }
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="addressRadio"
                                                id={`addressRadio-${ad_id}`}
                                                value={ad_id}
                                                checked={
                                                    selectedAddress?.ad_id ===
                                                    ad_id
                                                }
                                            />
                                            <label
                                                className="form-check-label font-grey"
                                                htmlFor="exampleRadios1"
                                            >
                                                {ad_title}
                                            </label>
                                        </div>
                                        <p className="ml-4">
                                            {`${ad_address}, ${ad_city},${ad_state}, ${ad_country}, ${ad_zip}`}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                </div>
                {addresses?.length > 0 && (
                    <div className="row d-flex justify-content-center mt-4">
                        <button
                            type="button"
                            className="btn login-btn w-25"
                            onClick={getPaymentDetails}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>{' '}
                            Continue
                        </button>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Addresses;

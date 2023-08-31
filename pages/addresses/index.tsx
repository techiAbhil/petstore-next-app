import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../store/store';

const Addresses = () => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedAddress, setSelectedAddress] = useState<any>();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
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
            const result: any = await axios.post(`/marketplace/cart/checkout`, {
                currency: 'INR',
                address_title: selectedAddress?.ad_title,
                address: `${selectedAddress?.ad_address}, ${selectedAddress?.ad_city},${selectedAddress?.ad_state}, ${selectedAddress?.ad_country}, ${selectedAddress?.ad_zip}`,
                cart_items: cartItemIds,
            });
            if (result.message === 'Success') {
                alert('Redircet to payment gateway pending implementation');
            }
            setIsOrderInfoFetching(false);
        } catch (e) {
            alert('Something went wrong! please try again!');
            setIsOrderInfoFetching(false);
            console.log('could not fetch the order details');
        }
    }, [cartItems, selectedAddress]);

    return (
        <Layout>
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

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import CustomLoader from '../../components/common/CustomLoader';
import Layout from '../../components/layout/layout';
import { getCartItems, updateCartItems } from '../../store/cart-items-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const CartComponent = () => {
    const disptach = useAppDispatch();
    const { cartItems, isLoading, error, isError } = useAppSelector(
        (state) => state.cart
    );
    const router = useRouter();

    useEffect(() => {
        disptach(getCartItems(undefined));
    }, [disptach]);

    const subTotal = useMemo(() => {
        if (cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => {
            return total + item?.ct_price * item?.ct_qty;
        }, 0);
    }, [cartItems]);

    const updateCartItemsHandler = useCallback(
        (request: any) => {
            try {
                disptach(updateCartItems(request));
            } catch (e) {
                alert('Something went wrong while updating cart items!');
            }
        },
        [disptach]
    );

    return (
        <Layout>
            <section className="mt-1 mb-1 container">
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        {!isLoading && cartItems.length === 0
                            ? 'No items have been added to cart!'
                            : 'Cart Items'}
                    </h2>
                </div>

                {cartItems?.length > 0 && (
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
                                {cartItems.map((item, index) => {
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
                                            <td align="center" valign="middle">
                                                {item?.pr_name}
                                            </td>
                                            <td align="center" valign="middle">
                                                {item?.ct_qty !== 0 && (
                                                    <i
                                                        className="fa-solid fa-circle-minus mx-2"
                                                        role="button"
                                                        onClick={() =>
                                                            updateCartItemsHandler(
                                                                {
                                                                    ct_id: item?.ct_id,
                                                                    isAddItem:
                                                                        false,
                                                                }
                                                            )
                                                        }
                                                    />
                                                )}
                                                {item?.ct_qty}
                                                <i
                                                    className="fa-solid fa-circle-plus mx-2"
                                                    role="button"
                                                    onClick={() =>
                                                        updateCartItemsHandler({
                                                            ct_id: item?.ct_id,

                                                            isAddItem: true,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td align="center" valign="middle">
                                                {item?.ct_price * item?.ct_qty}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td align="center"></td>
                                    <td align="center" valign="middle"></td>
                                    <td align="center" valign="middle">
                                        Subtotal
                                    </td>
                                    <td align="center" valign="middle">
                                        {subTotal ?? 0}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <div className="row d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn login-btn w-25"
                                onClick={() => router.push('/addresses')}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>{' '}
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </section>
            <CustomLoader show={isLoading} />
        </Layout>
    );
};

export default CartComponent;

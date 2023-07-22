import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import CustomLoader from '../../components/common/CustomLoader';
import CustomToaster from '../../components/common/Toaster';
import AuthLayout from '../../components/layout/auth-layout';
import { useAppDispatch } from '../../store/store';
import { setUserState } from '../../store/user-slice';
import { updateUserLocalStorageStateByToken } from '../../utils/helper';

const OAuth = () => {
    const [serviceError, setServiceError] = useState<string | undefined>(
        undefined
    );

    const [serviceSuccess, setServiceSuccess] = useState<string | undefined>(
        undefined
    );
    const router = useRouter();
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { data: userDetails } = useSession();

    const checkIfUserExsists = useCallback(async () => {
        try {
            setShowLoader(true);
            const {
                data: { token },
            } = await axios.get(
                `/auth/google-user-exists?email_id=${userDetails?.user?.email}`
            );

            const details = updateUserLocalStorageStateByToken(token);
            dispatch(setUserState(details));
            setShowLoader(false);
            router.replace('/');
        } catch (e: any) {
            const { data } = await axios.post('/auth/google-signin', {
                us_email: userDetails?.user?.email,
                us_full_name: userDetails?.user?.name,
                us_phone: '00000000',
                us_photo_url: userDetails?.user?.image,
                id: 'google id NA',
                token: 'google toooooookkkkkkkkkkkkkennnn',
            });

            setShowLoader(false);
            if (!data) {
                alert('Something went wrong!');
                router.replace('/login');
                return;
            }
            const details = updateUserLocalStorageStateByToken(data?.token);
            dispatch(setUserState(details));
            router.replace('/');
        }
    }, [
        dispatch,
        router,
        userDetails?.user?.email,
        userDetails?.user?.image,
        userDetails?.user?.name,
    ]);

    useEffect(() => {
        if (userDetails?.user?.email) {
            checkIfUserExsists();
        }
    }, [userDetails, router, checkIfUserExsists]);

    return (
        <AuthLayout>
            <>
                <CustomLoader show={showLoader} />
                <h1>Loading...!</h1>
                {serviceError && (
                    <CustomToaster
                        bodyContent={serviceError}
                        headerContent={
                            <strong className="me-auto">Error</strong>
                        }
                        onClose={() => setServiceError(undefined)}
                    />
                )}

                {serviceSuccess && (
                    <CustomToaster
                        bodyContent={serviceSuccess}
                        headerContent={
                            <strong className="me-auto">Success</strong>
                        }
                        onClose={() => {
                            setServiceSuccess(undefined);
                            localStorage.removeItem('RESET_PASSWORD_DETAILS');
                            router.replace(`/login`);
                        }}
                    />
                )}
            </>
        </AuthLayout>
    );
};

export default OAuth;

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { clearLogoutState } from '../../store/registration-slice';
import { RootState } from '../../store/store';

function ProfileDropdown() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: userDetails } = useSession();
    const logoutHandler = useCallback(() => {
        localStorage.removeItem('AUTH_TOKEN');
        if (userDetails) {
            signOut();
        }
        dispatch(clearLogoutState());
        setTimeout(() => {
            router.replace('/login');
        }, 200);
    }, [dispatch, router, userDetails]);

    const { us_full_name } = useSelector((state: RootState) => state.user);

    return (
        <Dropdown drop="down" align="end">
            <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#" disabled>
                    Welcome {us_full_name}
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => router.push('/profile')}>
                    Profile Details
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={logoutHandler}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProfileDropdown;

import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ProfileDropdown() {
    const router = useRouter();

    const logoutHandler = useCallback(() => {
        localStorage.clear();
        router.replace('/login');
    }, [router]);

    return (
        <Dropdown drop="down" align="end">
            <Dropdown.Toggle className="profile-dropdown" id="dropdown-basic">
                <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#" disabled>
                    Welcome John Doe
                </Dropdown.Item>
                <Dropdown.Item href="#">Profile Details</Dropdown.Item>
                <Dropdown.Item href="#" onClick={logoutHandler}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProfileDropdown;

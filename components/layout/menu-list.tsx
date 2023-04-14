import { useRouter } from 'next/router';

const MenuList = () => {
    const router = useRouter();

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 header-custom-menu-link">
            <li className="nav-item">
                <button
                    className="btn btn-menu-item"
                    onClick={() => router.push('my-pet')}
                >
                    My Pet Assistent
                </button>
            </li>

            <li className="nav-item">
                <button className="btn btn-menu-item">My Pet-O-Sphere</button>
            </li>

            <li className="nav-item">
                <button
                    className="btn btn-menu-item"
                    onClick={() => router.push('my-marketplace')}
                >
                    My Marketplace
                </button>
            </li>
        </ul>
    );
};

export default MenuList;

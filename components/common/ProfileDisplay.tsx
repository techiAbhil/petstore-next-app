import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ProfileDisplay = () => {
    const { us_profile_image } = useSelector((state: RootState) => state.user);

    return (
        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
            {us_profile_image ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_DIR}/${us_profile_image}`}
                    className="img-fluid circular-profile-pic"
                    alt="Profile image"
                    height={200}
                    width={200}
                />
            ) : (
                <i className="fa-solid fa-user fa-3x avatar-icon"></i>
            )}
        </div>
    );
};

export default ProfileDisplay;

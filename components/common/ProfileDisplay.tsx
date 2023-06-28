import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DefaultUserIcon from '../../assets/default-user.png';
import { RootState } from '../../store/store';

const ProfileDisplay = () => {
    const { us_profile_image } = useSelector((state: RootState) => state.user);
    const [profileImage, setProfileImage] = useState<any>(
        `${process.env.NEXT_PUBLIC_DIR}/${us_profile_image}`
    );

    const handleImageError = () => {
        setProfileImage(DefaultUserIcon);
    };

    return (
        <div className="circular-profile-pic d-flex justify-content-center align-items-center">
            <Image
                src={profileImage}
                className="img-fluid circular-profile-pic"
                alt="Profile image"
                height={200}
                width={200}
                onError={handleImageError}
            />
        </div>
    );
};

export default ProfileDisplay;

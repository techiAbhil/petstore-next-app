import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface MyImageProps extends ImageProps {
    defaultImage?: any;
}

const MyImage = (props: MyImageProps) => {
    const [pic, setPic] = useState<any>(props.src);

    const handleImageError = () => {
        setPic(props.defaultImage);
    };
    return (
        <Image {...props} alt="Image" src={pic} onError={handleImageError} />
    );
};

export default MyImage;

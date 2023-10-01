import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import ERROR_IMG from '../../assets/no-image.jpg';
import MyImage from '../common/MyImage';

const ProductCardItem = ({ pr_poster_path, pr_id, pr_name }: any) => {
    const router = useRouter();

    return (
        <>
            <div
                role="button"
                onClick={() => router.push(`/product-details/${pr_id}`)}
                className="product-card-item-cotnainer"
            >
                <MyImage
                    src={`${process.env.NEXT_PUBLIC_PROCUT_IMG_PATH}/${pr_poster_path}`}
                    alt="best selling dog food"
                    height={300}
                    width={250}
                    className="img-fit-cover"
                    defaultImage={ERROR_IMG}
                />
                <Button
                    type="submit"
                    className="orange-btn btn-block mx-2 product-btn"
                >
                    Shop Now
                </Button>
            </div>
            <h6 className="mt-2 text-center text-capitalize text-secondary">
                {pr_name}
            </h6>
        </>
    );
};

export default ProductCardItem;

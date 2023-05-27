import { useRouter } from 'next/router';

const ProductDetails = () => {
    const router = useRouter();
    const props = router.query.props;
    const [pr_id]: any = props ?? [''];
    return <div>ProductDetails{pr_id}</div>;
};

export default ProductDetails;

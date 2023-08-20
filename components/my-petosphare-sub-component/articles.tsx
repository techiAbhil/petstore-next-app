import { useRouter } from 'next/router';
import { useAppSelector } from '../../store/store';
import ArticlesBySection from './articles-by-section';

const Articles = () => {
    const { articleCategories } = useAppSelector((store) => store.myPetOSphare);
    const router = useRouter();
    return (
        <>
            {articleCategories && articleCategories?.length > 0 ? (
                articleCategories.map((cat: any, index: number) => (
                    <ArticlesBySection
                        key={`article-${index}`}
                        {...cat}
                        router={router}
                    />
                ))
            ) : (
                <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                    <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                        No Articles Found!
                    </h2>
                </div>
            )}
        </>
    );
};

export default Articles;

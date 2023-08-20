import DefaultArticleImage from '../../assets/default-article.png';
import MyImage from '../common/MyImage';
import CommonMenuSlider from '../common/common-menu-slider';

const ArticlesBySection = ({ ac_id, ac_title, articles, router }: any) => {
    return (
        <>
            <div className="mt-5 row d-flex flex-column align-items-center justify-content-center section-text-style">
                <h2 className="pt-1 col-sm-12 text-center text-uppercase">
                    {ac_title}
                </h2>
            </div>
            <div className="row justify-content-center mt-4">
                <CommonMenuSlider totalItems={articles?.length}>
                    {articles?.map(
                        (
                            { ar_banner_path, ar_title, ar_id }: any,
                            index: number
                        ) => {
                            return (
                                <div
                                    key={`history-menu-item-${index}`}
                                    className="mt-2 col-6 col-md-2 d-flex flex-column justify-content-center align-items-center"
                                    role="button"
                                    onClick={() =>
                                        router.push(
                                            `/products-by-animal/${ar_title}/${ar_id}`
                                        )
                                    }
                                >
                                    <div className="form-group">
                                        <div className="article-item">
                                            <MyImage
                                                src={`${process.env.NEXT_PUBLIC_ARTICLE_PIC}/${ar_banner_path}`}
                                                alt={ar_title}
                                                height={150}
                                                width={150}
                                                defaultImage={
                                                    DefaultArticleImage
                                                }
                                            />
                                        </div>
                                        <p className="mt-2 text-center">
                                            {ar_title}
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </CommonMenuSlider>
            </div>
        </>
    );
};

export default ArticlesBySection;
